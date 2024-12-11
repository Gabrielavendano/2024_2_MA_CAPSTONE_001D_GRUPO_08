from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import Reserve, MAX_RESERVAS_POR_DIA
from .serializers import ReserveSerializer
from django.contrib.auth import get_user_model
from django.db import connection
from django.core.mail import EmailMultiAlternatives
from django.http import JsonResponse
from django.conf import settings
from django.template.loader import render_to_string
import json
from django.shortcuts import redirect
import random
from datetime import datetime, timedelta
from services.models import Service
from django.http import JsonResponse


CustomUser = get_user_model()

@api_view(['GET'])
def get_base_price(request):
    """
    Devuelve el precio base por día de una reserva.
    """
    return Response({"base_price": 20000}, status=status.HTTP_200_OK)


@api_view(['POST'])
def create_reserve(request):
    user_id = request.data.get('user', None)
    email = request.data.get('email', None)
    if user_id:
        try:
            user = CustomUser.objects.get(id=user_id)
            email = user.email
        except CustomUser.DoesNotExist:
            return Response({"error": "Usuario no encontrado"}, status=status.HTTP_400_BAD_REQUEST)
    else:
        user = None

    reserva_data = request.data.copy()
    if user:
        reserva_data['user'] = user.id
    reserva_data['email'] = email

    try:
        # Extraer servicios como lista de objetos del JSON
        services = reserva_data.get('services', [])
        
        init_date = reserva_data.get('init_date')
        end_date = reserva_data.get('end_date')

        # Calcular duración en días
        fecha1 = datetime.strptime(init_date, "%Y-%m-%d")
        fecha2 = datetime.strptime(end_date, "%Y-%m-%d")
        days = (fecha2 - fecha1).days or 1

        # Calcular precios de servicios directamente desde los datos recibidos
        total_services = sum(service['price'] for service in services if 'price' in service)

        # Calcular el total de la reserva
        base_price = days * 20000
        total = base_price + total_services
        total_reserva = base_price * 0.2  # Solo considera el precio base

        # Asignar totales calculados al backend
        reserva_data['total'] = total
        reserva_data['total_reserva'] = total_reserva

    except Exception as e:
        print(f"Error en el cálculo de totales: {str(e)}")
        return Response({"error": f"Error en el cálculo de totales: {str(e)}"}, status=status.HTTP_400_BAD_REQUEST)

    # Validar y guardar reserva
    serializer = ReserveSerializer(data=reserva_data)
    if not serializer.is_valid():
        print("Errores del serializer:", serializer.errors)
        return Response({"errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    try:
        reserva = serializer.save()
        send_reservation_email(reserva)
        return Response({
            "message": "Reserva creada exitosamente",
            "id": reserva.id,
            "total": total,
            "total_reserva": total_reserva
        }, status=status.HTTP_201_CREATED)
    except Exception as e:
        print("Error inesperado al guardar la reserva:", str(e))
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def calculate_reservation_cost(request):
    try:
        services = request.data.get('services', [])
        init_date = request.data.get('init_date')
        end_date = request.data.get('end_date')

        # Validar fechas
        if not init_date or not end_date:
            return Response({"error": "Las fechas son obligatorias."}, status=400)

        # Calcular duración en días
        fecha1 = datetime.strptime(init_date, "%Y-%m-%d")
        fecha2 = datetime.strptime(end_date, "%Y-%m-%d")
        days = (fecha2 - fecha1).days or 1

        # Calcular precios de servicios
        total_services = sum(
            Service.objects.get(id=service_id).price for service_id in services
        )

        # Calcular totales
        base_price = days * 20000
        total = base_price + total_services
        total_reserva = base_price * 0.2  # Solo considera el precio base

        return Response({
            "total": total,
            "total_reserva": total_reserva,
        }, status=200)
    except Exception as e:
        return Response({"error": f"Error en el cálculo de costos: {str(e)}"}, status=500)


# Para visualizar la tabla reserves_reserve de la base de datos Sqlite3
def show_columns():
    with connection.cursor() as cursor:
        cursor.execute("PRAGMA table_info(reserves_reserve);")
        columns = cursor.fetchall()
        for column in columns:
            print(column)

@api_view(['GET'])
def get_reserves(request):
    reserves = Reserve.objects.all()
    serializer = ReserveSerializer(reserves, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def my_reserves(request):
    reserves = Reserve.objects.filter(user=request.user)  # Solo las reservas del usuario autenticado
    serializer = ReserveSerializer(reserves, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_reserves_by_id(request, user_id):
    reserves = Reserve.objects.filter(user_id=user_id )
    serializer = ReserveSerializer(reserves, many=True)
    return Response(serializer.data)

@api_view(['PUT'])
def edit_reserve(request, reserve_id):
    try:
        reserve = Reserve.objects.filter(id=reserve_id).first()
        if not reserve:
            return Response({"error": "Reserva no encontrada"}, status=status.HTTP_404_NOT_FOUND)

        serializer = ReserveSerializer(reserve, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    


@api_view(['DELETE'])
def delete_reserve(request, reserve_id):
    try:
        reserve = Reserve.objects.filter(id=reserve_id).first()
        if not reserve:
            return Response({"error": "Reserva no encontrada"}, status=status.HTTP_404_NOT_FOUND)
        reserve.delete()
        return Response({"message": "Reserva eliminada correctamente"}, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

def send_reservation_email(reserva):
    """Función para enviar un correo de confirmación de reserva."""
    subject = 'Confirmación de Reserva - Perriot Hotel'
    email_from = settings.EMAIL_HOST_USER
    recipient_list = [reserva.email]
    
    # Renderizar el contenido del correo desde un template
    content = render_to_string('emails/reservation_confirmation.html', {
        'reservation': reserva,
    })

    # Crear y enviar el correo
    message = EmailMultiAlternatives(subject, '', email_from, recipient_list)
    message.attach_alternative(content, "text/html")
    message.send()


@api_view(['POST'])
def simulate_webpay_transaction(request):
    """
    Simula una transacción de Webpay.
    """
    try:
        print("Datos recibidos:", request.data)

        # Obtén los datos necesarios para el pago
        total = request.data.get("total")
        reserve_id = request.data.get("reserve_id")

        # Verifica que la reserva exista
        try:
            reserva = Reserve.objects.get(id=reserve_id)
        except Reserve.DoesNotExist:
            return Response({"error": "Reserva no encontrada"}, status=status.HTTP_404_NOT_FOUND)

        # Verifica que el total coincida (opcional)
        if reserva.total != total:
            return Response({"error": "El monto no coincide con la reserva"}, status=status.HTTP_400_BAD_REQUEST)

        # Simula un token para la transacción
        simulated_token = f"webpay_{random.randint(1000, 9999)}"

        # URL de retorno que simula la confirmación del pago
        return_url = f"http://localhost:8000/reserves/simulate_webpay_confirm/{reserve_id}/{simulated_token}/"

        print("Generated return_url:", return_url)
        response_data = {
            "url": "http://localhost:3000/simulate_webpay",
            "token": simulated_token,
            "return_url": return_url,
        }

        print("Respuesta generada:", response_data)
        # Devuelve la URL para redirigir al usuario y el token
        return Response(response_data, status=200)

    except Exception as e:
        print("Error en simulate_webpay_transaction:", e)
        return Response({"error": str(e)}, status=500)



@api_view(['GET'])
def simulate_webpay_confirm(request, reserve_id, token):
    """
    Simula la confirmación de una transacción de Webpay.
    """
    try:
        # Aquí podrías actualizar el estado de la reserva a "pagado"
        # Si estás guardando estados de pago, actualízalo en la base de datos.
        return Response({
            "message": f"Pago para la reserva {reserve_id} confirmado con el token {token}.",
            "status": "success",
        }, status=200)

    except Exception as e:
        return Response({"error": str(e)}, status=500)
    
@api_view(['POST'])
def check_availability(request):
    init_date = request.data.get('init_date')
    end_date = request.data.get('end_date')

    if not init_date or not end_date:
        return Response({"error": "Fechas no proporcionadas."}, status=status.HTTP_400_BAD_REQUEST)

    try:
        fecha_inicio = datetime.strptime(init_date, "%Y-%m-%d").date()
        fecha_fin = datetime.strptime(end_date, "%Y-%m-%d").date()

        fechas = [fecha_inicio + timedelta(days=i) for i in range((fecha_fin - fecha_inicio).days)]

        for fecha in fechas:
            reservas_en_fecha = Reserve.objects.filter(
                init_date__lte=fecha,
                end_date__gte=fecha
            ).count()
            if reservas_en_fecha >= MAX_RESERVAS_POR_DIA:
                return Response({"available": False})

        return Response({"available": True})
    except Exception as e:
        return Response({"error": f"Error procesando las fechas: {str(e)}"}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def get_slots_range(request):
    try:
        start_date = request.data.get('start_date')
        end_date = request.data.get('end_date')

        if not start_date or not end_date:
            return Response({"error": "Fechas no proporcionadas."}, status=400)

        start_date = datetime.strptime(start_date, "%Y-%m-%d").date()
        end_date = datetime.strptime(end_date, "%Y-%m-%d").date()

        current_date = start_date
        slots = {}

        while current_date <= end_date:
            reservas_count = Reserve.objects.filter(
                init_date__lte=current_date,
                end_date__gte=current_date
            ).count()
            slots[str(current_date)] = max(40 - reservas_count, 0)
            current_date += timedelta(days=1)
        return Response({"slots": slots}, status=200)
    except Exception as e:
        print("Error en get_slots_range:", e)
        return Response({"error": f"Error al procesar la solicitud: {str(e)}"}, status=500)
