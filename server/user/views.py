# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from rest_framework import viewsets
from .models import User, Friends
from users.serializers import UserSerializer, FriendSerializer
from rest_framework.response import Response
from rest_framework.decorators import detail_route
from account.permissions import IsAdminOrIsSelf
from django.db.models import Q
from django.core import serializers


# Create your views here.

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_field = 'pk'

    class Meta:
        model = User

    def get_queryset(self):
        return User.objects.all()

    def create(self, request):
        serializer = UserSerializer(data=request.POST)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)

    @detail_route(methods=['get', 'post'], permission_classes=[IsAdminOrIsSelf], url_path='friends',
                  serializer_class=FriendSerializer)
    def friends(self, request, pk=None):
        if request.method == 'GET':
            user = request.user.pk
            data = Friends.objects.filter(Q(user=user) | Q(friend=user)).filter(status=True)
            return Response(serializers.serialize('json', data))
        else:
            # print("id", request.user.id)
            serializer = FriendSerializer(data={'user': request.user.pk, 'friend': request.POST['friend']})
            print(serializer)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors)
