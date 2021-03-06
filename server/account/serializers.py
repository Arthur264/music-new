from django.contrib.auth import authenticate
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from rest_framework import serializers
from rest_framework.authtoken.models import Token

from user.models import User
from user.serializers import UserSerializer


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    password = serializers.CharField(required=True)

    class Meta:
        fields = ('username', 'password')

    def login(self):
        username = self.validated_data['username']
        password = self.validated_data['password']
        user = authenticate(username=username, password=password)
        if not user:
            raise serializers.ValidationError({'username': ['Username or password incorrect']})

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


class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True, max_length=30)
    new_password = serializers.CharField(required=True, max_length=30)
    confirm_password = serializers.CharField(required=True, max_length=30)

    def validate(self, validation_data):
        if not self.context['request'].user.check_password(validation_data.get('old_password')):
            raise serializers.ValidationError({'old_password': 'Wrong password.'})

        if validation_data.get('confirm_password') != validation_data.get('new_password'):
            raise serializers.ValidationError({'confirm_password': 'Password must be confirmed correctly.'})

        try:
            validate_password(validation_data.get('new_password'))
        except ValidationError as e:
            raise serializers.ValidationError({'new_password': e.messages})

        return validation_data

    def change_password(self):
        user = self.context['request'].user
        user.set_password(self.validated_data['new_password'])
        user.save()
        return user
