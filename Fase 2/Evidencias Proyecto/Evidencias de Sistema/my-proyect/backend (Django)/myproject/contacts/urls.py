from django.urls import path
from .views import  get_contacts, create_contact

urlpatterns = [
    path('getall/', get_contacts, name='getall'),
    path('create/', create_contact, name='create'),
]