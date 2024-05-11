from django.contrib import admin
from django.urls import path
from api.views import SignUpView, SignInView, ImagePredictionView
from api.views import UserProfileView
from api.views import PredictionHistoryView
from api.views import ContactUsView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/predict/', ImagePredictionView.as_view(), name='predict'),
    path('api/signup/', SignUpView.as_view(), name='signup'),
    path('api/signin/', SignInView.as_view(), name='signin'),
    path('api/profile/', UserProfileView.as_view(), name='user_profile'),
    path('prediction/history/', PredictionHistoryView.as_view(), name='prediction_history'),
    path('contact/', ContactUsView.as_view(), name='contact_us'),
]
