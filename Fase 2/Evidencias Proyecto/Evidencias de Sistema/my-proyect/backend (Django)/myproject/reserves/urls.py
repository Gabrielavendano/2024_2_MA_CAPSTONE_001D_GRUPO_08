from django.urls import path
from .views import create_reserve, get_reserves, get_reserves_by_id, edit_reserve, delete_reserve, my_reserves, simulate_webpay_transaction, simulate_webpay_confirm

urlpatterns = [
    path('create/', create_reserve, name='create'),
    path('get/', get_reserves, name='get'),
    path('get/<int:user_id>/', get_reserves_by_id, name='get_by_id'),
    path('edit/<int:reserve_id>/', edit_reserve, name='edit'),
    path('delete/<int:reserve_id>/', delete_reserve, name='delete'),
    path('my_reserves/', my_reserves, name='my_reserves'),
    path('simulate_webpay_transaction/', simulate_webpay_transaction, name='simulate_webpay_transaction'),
    path('simulate_webpay_confirm/<int:reserve_id>/<str:token>/', simulate_webpay_confirm, name='simulate_webpay_confirm'),
]


