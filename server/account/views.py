# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import list_route
from .permissions import IsAdminOrIsSelf
from user.models import User
from user.serializers import UserSerializer
from rest_framework import status
from .serializers import LoginSerializer, RegisterSerializer
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny
from django.forms.models import model_to_dict
from rest_framework.authtoken.serializers import AuthTokenSerializer
from django.contrib.auth import authenticate
import json
# Create your views here.

class AuthViewSet(viewsets.ViewSet):
    queryset = User.objects.all()

    @list_route(methods=['post'], permission_classes=[IsAdminOrIsSelf], url_path='change-password')
    def set_password(self, request):
        serialized = UserSerializer(data=request.DATA)
        if serialized.is_valid():
            serialized.save()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        else:
            return Response(serialized.errors, status=status.HTTP_400_BAD_REQUEST)

    @list_route(methods=['post'], permission_classes=[AllowAny], url_path='login')
    def login(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        user = authenticate(username=username, password=password)
        if not user:
            return Response({"error": "Login failed"}, status=status.HTTP_401_UNAUTHORIZED)

        token, _ = Token.objects.get_or_create(user=user)
        user_data = UserSerializer(user)
        data = {
            'user': user_data.data,
            'token': token.key
        }
        return Response(data)

    @list_route(methods=['post'],permission_classes=[AllowAny], url_path='register')
    def register(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({
                'user_id': user.id, 
                'email': user.email,  
                'token': model_to_dict(user.auth_token)['key']}, status=status.HTTP_201_CREATED)
                
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @list_route(methods=['get'], permission_classes=[IsAdminOrIsSelf], url_path='logout')
    def logout(self, request):
        request.user.auth_token.delete()
        return Response(status=status.HTTP_200_OK)

    @list_route(methods=['get'], permission_classes=[IsAdminOrIsSelf], url_path='token')
    def token(self, request):
        u = User.objects.get(username=request.user.username)
        token, created = Token.objects.get_or_create(user=u)
        request.user.token = token.key
        return Response({"token": token.key})
