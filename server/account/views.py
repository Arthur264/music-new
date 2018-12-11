# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib.auth import logout
from django.forms.models import model_to_dict
from rest_framework import status, viewsets
from rest_framework.authtoken.models import Token
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from user.models import User
from user.serializers import UserSerializer
from .permissions import IsAdminOrIsSelf
from .serializers import (
    RegisterSerializer,
    LoginSerializer,
    ChangePasswordSerializer,
)


class AuthViewSet(viewsets.ViewSet):
    queryset = User.objects.all()

    @action(methods=['post'], permission_classes=[IsAuthenticated], url_path='change-password', detail=False)
    def set_password(self, request):
        change_password_serializer = ChangePasswordSerializer(data=request.data, context={'request': request})
        change_password_serializer.is_valid(raise_exception=True)
        change_password_serializer.change_password()
        return Response(status=status.HTTP_200_OK)

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

    @action(permission_classes=[IsAdminOrIsSelf], url_path='logout', detail=False)
    def logout_user(self, request):
        request.user.auth_token.delete()
        logout(request)
        return Response(status=status.HTTP_200_OK)

    @action(permission_classes=[IsAdminOrIsSelf], url_path='token', detail=False)
    def token(self, request):
        user = User.objects.get(username=request.user.username)
        token, created = Token.objects.get_or_create(user=user)
        request.user.token = token.key
        return Response({"token": token.key})
