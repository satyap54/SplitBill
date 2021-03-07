from django.shortcuts import get_object_or_404, render

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, viewsets, filters
from . import models
from . import serializers
from . import permissions


class Trips(APIView):
    queryset = models.Trip.objects.all()
    serializer_class = serializers.TripSerializer
    permission_classes = (permissions.UpdateOwnObject, )

    def get(self, request, format=None):
        trip_objects = self.queryset.filter(user = request.user)
        
        trip_names = []
        for ob in trip_objects:
            trip_names.append({
                "name" : ob.name,
                "id" : ob.pk,
            })

        return Response({"tripList" : trip_names})

    def post(self, request, format=None):
        data = {
            "name" : request.data["trip_details"]["name"],
            "user" : request.user.id,
        }

        serializer = self.serializer_class(data=data)
        if(serializer.is_valid(raise_exception=True)):
            serializer.save()
        
        return Response({'success' : "Created trip",}, status=204)

    def delete(self, request, pk):
        trip = get_object_or_404(self.queryset, pk = pk)
        trip.delete()
        return Response({
                "message" : "Deleted",
            },
            status = 204
        )


class GangMemberAPIView(APIView):
    queryset = models.GangMember.objects.all()
    permission_classes = (permissions.UpdateOwnObject, )
    serializer_class = serializers.GangMemberSerializer

    def post(self, request, pk = None):
        if(pk):
            gang_members = self.queryset.filter(room_id = pk)
            ret = []
            for ob in gang_members:
                ret.append({
                    "name" : ob.name,
                    "id" : ob.pk,
                })
            
            return Response({
                "gangMembers" : ret,
            }, status = 200)

        data = {
            "name" : request.data["name"],
            "room_id" : request.data["room_id"],
            "user" : request.user.id,
        }
       
        serializer = self.serializer_class(data=data)
        if(serializer.is_valid(raise_exception=True)):
            serializer.save()
        
        return Response({
            "message" : "Added gang member",
        }, status=204)

    def delete(self, request, pk):
        gang_member = get_object_or_404(self.queryset, pk=pk)
        gang_member.delete()
        return Response({
            "message" : "Delete Gang Member",
        }, status=204)


class TransactionAPIView(APIView):
    queryset = models.Transaction.objects.all()
    permission_classes = (permissions.UpdateOwnObject, )
    serializer_class = serializers.TransactionSerializer

    def post(self, request, pk=None):
        if(pk):
            transaction_list = []
            transaction_objects = self.queryset.filter(room_id = pk)
            for ob in transaction_objects:
                print("....................", ob.gang_member_name.name)
                transaction_list.append({
                    "paidBy" : ob.gang_member_name.name,
                    "paidOn" : ob.date_of_payment,
                    "amount" : ob.amount,
                    "paidAt" : ob.place_of_payment,
                    "description" : ob.description,
                    "id" : ob.pk,
                })

            return Response({
                "transactions" : transaction_list,
            }, status = 200)

        data = {
            "gang_member_name" : request.data["paidBy"],
            "data_of_payment" : request.data["paidOn"],
            "amount" : request.data["amount"],
            "place_of_payment" : request.data["paidAt"],
            "description" : request.data["description"],
            "user" : request.user.id,
            "room_id" : request.data["room_id"],
        }

        serializer = self.serializer_class(data=data)
        if(serializer.is_valid(raise_exception=True)):
            serializer.save()
        
        return Response({
            "message" : "Added transactio",
        }, status=204)

    def delete(self, request, pk):
        ob = get_object_or_404(self.queryset, pk = pk)
        ob.delete()
        return Response({
            "message" : "Delete Transaction",
        }, status=204)