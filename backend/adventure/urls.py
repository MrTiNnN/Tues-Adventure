from django.urls import path
from . import views

urlpatterns = [
    path('creation/', views.creation),
    path('adventure/', views.adventure),
    path('signingUp/', views.signingUp),
    path('allAdventures/', views.allAdventures)
]