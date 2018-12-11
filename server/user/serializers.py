from rest_framework import serializers

from .models import User


class UserSerializer(serializers.ModelSerializer):
    date_joined = serializers.DateTimeField(format='%Y-%d-%m', read_only=True)
    email = serializers.EmailField()
    avatar = serializers.ImageField(max_length=None, use_url=True, required=False, default=None)

    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'email', 'avatar', 'city', 'date_joined', 'description')
        read_only_fields = ('id', 'date_joined', 'city')
        write_only_fields = ('first_name', 'last_name', 'email', 'username', 'avatar')

    def create(self, validated_data):
        user = super(UserSerializer, self).create(validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user


class AvatarSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('avatar',)


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'email', 'city', 'phone',)

    def update(self, instance, validated_data):
        for (key, value) in validated_data.items():
            setattr(instance, key, value)
        instance.save()
        return instance
