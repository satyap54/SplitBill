from django.db.models import fields
from api import models
from djoser.serializers import UserCreateSerializer
from django.contrib.auth import get_user_model
from rest_framework import serializers
from . import models

User = get_user_model()


class UserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ('id', 'email', 'name', 'password')


class TripSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Trip
        fields = ("name", "user")


class GangMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.GangMember
        fields = ("name", "user", "room_id")


class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Transaction
        fields = ("gang_member_name", "place_of_payment", "amount", "date_of_payment", "description", 
                    "room_id", "user")