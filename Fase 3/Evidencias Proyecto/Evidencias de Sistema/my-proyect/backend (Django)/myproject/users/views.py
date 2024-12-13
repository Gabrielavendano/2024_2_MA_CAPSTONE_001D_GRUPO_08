from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Reserva, Contacto
from .serializers import UserSerializer, ReservaSerializer, ContactoSerializer
from django.contrib.auth import authenticate
from django.contrib.auth.models import User  # Asegúrate de importar el modelo de usuario
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes

@api_view(['POST'])
def register_user(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        
        # Generar el token
        refresh = RefreshToken.for_user(user)
        access_token = refresh.access_token
        
        return Response({
            "message": "Usuario creado exitosamente",
            "token": str(access_token),
            "user": {
                "id": user.id,
                "first_name": user.first_name,
                "last_name": user.last_name,
                "email": user.email,
            }
        }, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def login_user(request):
    CustomUser = get_user_model()
    email = request.data.get('email')
    password = request.data.get('password')

    user = authenticate(request, username=email, password=password)
    if user:
        # Generar el token
        refresh = RefreshToken.for_user(user)
        access_token = refresh.access_token
        
        return Response({
            'token': str(access_token),
            'user': {
                'id': user.id,
                'first_name': user.first_name,
                'last_name': user.last_name,
                'email': user.email,
                'is_superuser': user.is_superuser,
            }
        })
    
    else:
        try:
            User.objects.get(email=email)
            error_message = "Usuario o contraseña incorrecto"
        except User.DoesNotExist:
            error_message = "Usuario no encontrado"
        
        return Response({"error": error_message}, status=status.HTTP_400_BAD_REQUEST)

    
@api_view(['GET'])
def listar_reservas(request):
    reservas = Reserva.objects.all()
    serializer = ReservaSerializer(reservas, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def listar_contactos(request):
    contactos = Contacto.objects.all()
    serializer = ContactoSerializer(contactos, many=True)
    return Response(serializer.data)

