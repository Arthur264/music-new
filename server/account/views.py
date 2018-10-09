# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib.auth import logout
from django.forms.models import model_to_dict
from rest_framework import status, viewsets
from rest_framework.authtoken.models import Token
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from user.models import User
from user.serializers import UserSerializer
from .permissions import IsAdminOrIsSelf
from .serializers import RegisterSerializer, LoginSerializer


# Create your views here.

class AuthViewSet(viewsets.ViewSet):
    queryset = User.objects.all()

    @action(methods=['post'], permission_classes=[IsAdminOrIsSelf], url_path='change-password', detail=False)
    def set_password(self, request):
        serialized = UserSerializer(data=request.data)
        serialized.is_valid(raise_exception=True)
        serialized.save()
        return Response(status=status.HTTP_205_RESET_CONTENT)

    @action(methods=['post'], permission_classes=[AllowAny], url_path='login', detail=False)
    def login(self, request):
        login_serializer = LoginSerializer(data=request.data)
        login_serializer.is_valid(raise_exception=True)
        login_data = login_serializer.login()
        return Response(login_data)

    @action(methods=['post'], permission_classes=[AllowAny], url_path='register', detail=False)
    def register(self, request):
        register_serializer = RegisterSerializer(data=request.data)
        register_serializer.is_valid(raise_exception=True)
        user = register_serializer.save()
        return Response({
            'user': UserSerializer(user).data,
            'token': model_to_dict(user.auth_token)['key']
        }, status=status.HTTP_201_CREATED)

    @action(methods=['get'], permission_classes=[IsAdminOrIsSelf], url_path='logout', detail=False)
    def logout_user(self, request):
        request.user.auth_token.delete()
        logout(request)
        return Response(status=status.HTTP_200_OK)

    @action(methods=['get'], permission_classes=[IsAdminOrIsSelf], url_path='token', detail=False)
    def token(self, request):
        u = User.objects.get(username=request.user.username)
        token, created = Token.objects.get_or_create(user=u)
        request.user.token = token.key
        return Response({"token": token.key})
