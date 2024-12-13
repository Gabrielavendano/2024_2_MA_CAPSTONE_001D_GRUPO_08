from django.urls import path
from .views import register_user, login_user, listar_reservas, listar_contactos

urlpatterns = [
    path('register/', register_user, name='register'),
    path('login/', login_user, name='login'),
    path('reservas/', listar_reservas, name='listar_reservas'),
    path('contactos/', listar_contactos, name='listar_contactos'),
]


