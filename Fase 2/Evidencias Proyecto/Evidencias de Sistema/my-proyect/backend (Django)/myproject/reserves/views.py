from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Reserve
from .serializers import ReserveSerializer
from django.contrib.auth import get_user_model
from django.db import connection

CustomUser = get_user_model()

@api_view(['POST'])
def create_reserve(request):
    # Verifica si el usuario está presente en los datos enviados
    user_id = request.data.get('user', None)
    email = request.data.get('email', None)
    print("Datos del request:", request.data)
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
    print("Datos para el serializador:", reserva_data)

    # Serializa los datos
    serializer = ReserveSerializer(data=request.data)
    if serializer.is_valid():
        # Guarda la reserva en la base de datos
        serializer.save()
        return Response({"message": "Reserva creada exitosamente"}, status=status.HTTP_201_CREATED)
    
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