from django.urls import path
from .views import  create_reserve, get_reserves, get_reserves_by_id

urlpatterns = [
    path('create/', create_reserve, name='create'),
    path('get/', get_reserves, name='get'),
    path('get/<int:user_id>', get_reserves_by_id, name='get'),
]

