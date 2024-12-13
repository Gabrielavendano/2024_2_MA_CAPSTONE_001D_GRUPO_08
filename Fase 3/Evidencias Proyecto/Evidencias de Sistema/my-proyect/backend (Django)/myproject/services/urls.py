from django.urls import path
from .views import  get_services

urlpatterns = [
    path('getall/', get_services, name='getall'),
]


