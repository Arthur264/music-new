# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.core import serializers
from django.db.models import Q
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .serializers import UserSerializer, FriendSerializer

from account.permissions import IsAdminOrIsSelf
from .models import User, Friends


# Create your views here.

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_field = 'pk'

    class Meta:
        model = User

    @action(methods=['get', 'post'], permission_classes=[IsAdminOrIsSelf], url_path='friends', detail=True)
    def friends(self, request, pk=None):
        if request.method == 'GET':
            user = request.user.pk
            data = Friends.objects.filter(Q(user=user) | Q(friend=user)).filter(status=True)
            return Response(serializers.serialize('json', data))
        else:
            serializer = FriendSerializer(data={'user': request.user.pk, 'friend': request.POST['friend']})
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors)
