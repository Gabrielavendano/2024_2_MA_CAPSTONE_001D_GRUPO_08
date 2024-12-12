from django.db import models
from django.contrib.auth import get_user_model
from datetime import timedelta

CustomUser = get_user_model()
MAX_RESERVAS_POR_DIA = 40

class Reserve(models.Model):
    id = models.AutoField(primary_key=True)
    services = models.JSONField(blank=True, default=list) 
    init_date = models.DateField()
    end_date = models.DateField()
    pet_name = models.CharField(max_length=100)
    pet_size = models.CharField(max_length=100)
    pet_breed = models.CharField(max_length=100)
    total_reserva = models.IntegerField()  # Total base de la reserva (sin servicios)
    total = models.IntegerField()  # Total incluyendo servicios
    email = models.EmailField(blank=True, null=True)
    pagado = models.BooleanField(default=False)  # Si la reserva está pagada en su totalidad
    user = models.ForeignKey(CustomUser, on_delete=models.SET_NULL, null=True, blank=True)

    MAX_RESERVAS_POR_DIA = 40

    def verificar_disponibilidad(self):
        """
        Comprueba si las fechas de esta reserva no exceden el límite de reservas permitidas por día.
        """
        fechas = [self.init_date + timedelta(days=i) for i in range((self.end_date - self.init_date).days)]

        for fecha in fechas:
            reservas_en_fecha = Reserve.objects.filter(
                init_date__lte=fecha,
                end_date__gte=fecha
            ).count()
            if reservas_en_fecha >= MAX_RESERVAS_POR_DIA:
                print(f"Fecha sin cupo: {fecha}, Reservas: {reservas_en_fecha}")
                return False
        return True


    def save(self, *args, **kwargs):
        if not self.verificar_disponibilidad():
            raise ValueError("Las fechas seleccionadas no están disponibles.")
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Reserva: {self.pet_name} - {self.user.email if self.user else 'Sin usuario'}"
