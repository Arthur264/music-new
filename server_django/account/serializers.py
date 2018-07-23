from users.models import User
from rest_framework import serializers
from rest_framework.compat import authenticate

class LoginSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('email', 'password')
        
    def create(self, validated_data):
        print("test")
        
    # def validate(self, attrs):
    #     email = attrs.get('email')
    #     password = attrs.get('password')
    #     print("test", email, password)
    #     if email and password:
    #         user = authenticate(request=self.context.get('request'),
    #                             email=email, password=password)
    
    #             # The authenticate call simply returns None for is_active=False
    #             # users. (Assuming the default ModelBackend authentication
    #             # backend.)
    #         if not user:
    #             msg = _('Unable to log in with provided credentials.')
    #             raise serializers.ValidationError(msg, code='authorization')
    #         else:
    #             msg = _('Must include "username" and "password".')
    #             raise serializers.ValidationError(msg, code='authorization')
    
    #         attrs['user'] = user
    #         return attrs


class RegisterSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('username', 'email', 'password')
        
    def create(self, validated_data):
       user = super(RegisterSerializer, self).create(validated_data)
       user.set_password(validated_data['password'])
       user.save()
       return user

			