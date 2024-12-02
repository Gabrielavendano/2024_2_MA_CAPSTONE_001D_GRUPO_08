from rest_framework import serializers
from .models import Reserve
from services.serializers import ServiceSerializer  # Importa el serializador de Service
from django.contrib.auth.models import User  # Importa el modelo de User

class ReserveSerializer(serializers.ModelSerializer):
    services = ServiceSerializer(many=True)
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())  # Asegúrate de que se esté manejando el user correctamente

    class Meta:
        model = Reserve
        fields = ['user', 'services', 'init_date', 'end_date',  'pet_name', 'pet_type', 'pet_breed', 'total']

    def create(self, validated_data):
        services_data = validated_data.pop('services')
        user_data = validated_data.pop('user')  # Asegúrate de que el user sea un ID
        reserve = Reserve.objects.create(user_id=user_data, **validated_data)  # Pasa solo el ID del usuario
        for service_data in services_data:
            service = service.objects.get(id=service_data['id'])  # Añadir servicio a la reserva
            reserve.services.add(service)
        return reserve
