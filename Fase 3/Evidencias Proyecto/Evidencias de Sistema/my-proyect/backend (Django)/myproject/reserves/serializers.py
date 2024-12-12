from .models import Reserve
from rest_framework import serializers  


class ReserveSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reserve
        fields = '__all__'

    def validate(self, data):
        """
        Validaciones personalizadas para asegurar la consistencia de los datos.
        """
        if data['total_reserva'] > data['total']:
            raise serializers.ValidationError({
                "total_reserva": "El monto total no puede ser menor al total reserva."
            })
        return data

