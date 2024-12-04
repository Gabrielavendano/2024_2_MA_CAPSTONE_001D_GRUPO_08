from django.db import models
from django.contrib.auth import get_user_model

CustomUser = get_user_model()

class Reserve(models.Model):
    id= models.AutoField(primary_key=True)
    services = models.JSONField(models.IntegerField(), blank=True, default=list) 
    init_date = models.DateField()
    end_date = models.DateField()
    pet_name = models.CharField(max_length=100)
    pet_type = models.CharField(max_length=100)
    pet_breed = models.CharField(max_length=100)
    total = models.IntegerField()
    email = models.EmailField(blank=True, null=True)
    user = models.ForeignKey(CustomUser, on_delete=models.SET_NULL, null=True, blank=True)

def __str__(self):
        return f"Reserva: {self.nombre_mascota} - {self.nombre}"