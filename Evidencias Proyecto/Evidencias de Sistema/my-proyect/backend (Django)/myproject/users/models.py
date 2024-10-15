from django.contrib.auth.models import AbstractUser, Group, Permission
from django.db import models

class CustomUser(AbstractUser):
    # Campos personalizados (si los necesitas)

    groups = models.ManyToManyField(
        Group,
        related_name='customuser_set',  # Cambia el nombre según prefieras
        blank=True,
    )
    user_permissions = models.ManyToManyField(
        Permission,
        related_name='customuser_set',  # Cambia el nombre según prefieras
        blank=True,
    )

    class Meta:
        verbose_name = 'User'
        verbose_name_plural = 'Users'
