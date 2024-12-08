from django.urls import path
from . import views
from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('', views.api_overview, name="api-overview"),
    path('admin/', admin.site.urls),
    path('api/', include('users.urls')),  
    path('services/', include('services.urls')),  
    path('reserves/', include('reserves.urls')),  
    path('contacts/', include('contacts.urls')),  
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]

