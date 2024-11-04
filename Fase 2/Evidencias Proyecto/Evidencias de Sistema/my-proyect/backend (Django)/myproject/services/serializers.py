
from .models import Service
from rest_framework import serializers  


class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ['id','name', 'info', 'image', 'price']