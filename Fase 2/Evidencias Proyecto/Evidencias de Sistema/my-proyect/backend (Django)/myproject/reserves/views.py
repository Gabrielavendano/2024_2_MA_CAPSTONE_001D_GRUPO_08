from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import Reserve
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

CustomUser = get_user_model()

@api_view(['POST'])
def create_reserve(request):
    # Verifica si el usuario está presente en los datos enviados
    user_id = request.data.get('user', None)
    email = request.data.get('email', None)
    if user_id:
        try:
            user = CustomUser.objects.get(id=user_id)
            email = user.email  
            print("Usuario encontrado:", user, "Email:", email)
        except CustomUser.DoesNotExist:
            return Response({"error": "Usuario no encontrado"}, status=status.HTTP_400_BAD_REQUEST)
    else:
        user = None

    reserva_data = request.data.copy()
    if user:
        reserva_data['user'] = user.id
    reserva_data['email'] = email  

    # Serializa los datos
    serializer = ReserveSerializer(data=reserva_data)
    if serializer.is_valid():
        # Guarda la reserva en la base de datos
        reserva = serializer.save()

        # Enviar correo de confirmación
        send_reservation_email(reserva)

        return Response({"message": "Reserva creada exitosamente", "id": reserva.id}, status=status.HTTP_201_CREATED)
    
    # Imprime y retorna errores en caso de datos inválidos
    print(serializer.errors)
    return Response({"errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

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
