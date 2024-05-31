from django.urls import path
from . import views

urlpatterns = [
    path('registration/', views.registration),
    path('authentication/', views.authentication)
]