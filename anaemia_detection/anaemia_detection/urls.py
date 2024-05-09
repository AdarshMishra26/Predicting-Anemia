from django.contrib import admin
from django.urls import path
from api.views import SignUpView, SignInView, ImagePredictionView
from api.views import UserProfileView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/predict/', ImagePredictionView.as_view(), name='predict'),
    path('api/signup/', SignUpView.as_view(), name='signup'),
    path('api/signin/', SignInView.as_view(), name='signin'),
    path('api/user/profile/', UserProfileView.as_view(), name='user_profile'),
]
