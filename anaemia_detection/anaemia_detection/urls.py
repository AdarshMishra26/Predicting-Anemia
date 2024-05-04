from django.contrib import admin
from django.urls import path, include
from api import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/predict/', views.ImagePredictionView.as_view(), name='predict'),
]
