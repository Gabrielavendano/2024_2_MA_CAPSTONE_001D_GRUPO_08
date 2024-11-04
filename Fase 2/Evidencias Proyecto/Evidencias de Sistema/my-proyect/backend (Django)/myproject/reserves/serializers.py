
from .models import Reserve
from rest_framework import serializers  


class ReserveSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reserve
        fields = ['id', 'user_id','services', 'init_date', 'end_date', 'pet_name', 'pet_type', 'pet_breed' , 'total']