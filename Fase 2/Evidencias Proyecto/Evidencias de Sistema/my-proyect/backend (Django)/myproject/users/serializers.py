from django.contrib.auth import get_user_model
from rest_framework import serializers  
from .models import Reserva, Contacto

CustomUser = get_user_model()  

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser  # Usa el modelo personalizado
        fields = ('first_name', 'last_name', 'email', 'password')
        extra_kwargs = {
            'password': {'write_only': True}  
        }

    def create(self, validated_data):
        user = CustomUser(
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            email=validated_data['email'],
            username=validated_data['email'],  # Usar email como nombre de usuario
        )
        user.set_password(validated_data['password'])  # Establece la contraseña de forma segura
        user.save()
        return user

    def validate_email(self, value):
        if CustomUser.objects.filter(email=value).exists():
            raise serializers.ValidationError("Este correo electrónico ya está registrado.")
        return value
    
class ReservaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reserva
        fields = ['nombre', 'telefono', 'nombre_mascota', 'raza_mascota', 'precio']

class ContactoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contacto
        fields = ['nombre', 'correo', 'mensaje']

