from user.models import User
from rest_framework import serializers
from rest_framework.compat import authenticate

class LoginSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('email', 'password')
        
    def create(self, validated_data):
        print("test")
        

class RegisterSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('username', 'email', 'password')
        
    def create(self, validated_data):
       user = super(RegisterSerializer, self).create(validated_data)
       user.set_password(validated_data['password'])
       user.save()
       return user

			