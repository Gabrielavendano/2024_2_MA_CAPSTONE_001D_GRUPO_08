from django.urls import path
from .views import  get_contacts, create_contact, edit_contact, delete_contact

urlpatterns = [
    path('get/', get_contacts, name='get'),
    path('create/', create_contact, name='create'),
    path('edit/<int:contact_id>/', edit_contact, name='edit'),
    path('delete/<int:contact_id>/', delete_contact, name='delete'),
]