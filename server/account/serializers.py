from rest_framework import serializers
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from user.serializers import UserSerializer

from user.models import User


class LoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'password')

    def login(self):
        username = self.validated_data['user']
        password = self.validated_data['password']
        user = authenticate(username=username, password=password)
        if not user:
            return serializers.ValidationError({"error": "Username or password incorrect"})

        token, _ = Token.objects.get_or_create(user=user)
        user_serializer = UserSerializer(user)
        return {
            'user': user_serializer.data,
            'token': token.key
        }


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'password')

    def create(self, validated_data):
        user = super(RegisterSerializer, self).create(validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user
