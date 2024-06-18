from django.urls import path
from . import views

urlpatterns = [
    path('registration/', views.registration),
    path('authentication/', views.authentication),
    path('verification/', views.verification),
    # path('fake/', views.fake_view)
]