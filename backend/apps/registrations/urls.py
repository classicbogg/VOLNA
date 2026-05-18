from django.urls import path

from .views import RegistrationCreateAPIView

app_name = 'registrations'

urlpatterns = [
    path('registrations/', RegistrationCreateAPIView.as_view(), name='registration-create'),
]
