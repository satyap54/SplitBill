from django.urls import path, include
from . import views

from rest_framework.routers import DefaultRouter

urlpatterns = [
    path('trips-list/<int:pk>', views.Trips.as_view(), name="trips-list"),
    path('trips-list', views.Trips.as_view(), name="trips-list"),
    path("gang-member/<int:pk>", views.GangMemberAPIView.as_view()),
    path("gang-member", views.GangMemberAPIView.as_view()),
    path("transaction/<int:pk>", views.TransactionAPIView.as_view()),
    path("transaction", views.TransactionAPIView.as_view()),
]