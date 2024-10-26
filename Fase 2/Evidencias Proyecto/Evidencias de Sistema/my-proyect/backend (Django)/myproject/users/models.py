from django.db import models
    
class Reserva(models.Model):
    nombre = models.CharField(max_length=100)
    telefono = models.CharField(max_length=15)
    nombre_mascota = models.CharField(max_length=100)
    raza_mascota = models.CharField(max_length=100)
    precio = models.DecimalField(max_digits=10, decimal_places=2)

class Contacto(models.Model):
    nombre = models.CharField(max_length=100)
    correo = models.EmailField()
    mensaje = models.TextField()
