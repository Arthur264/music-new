from .models import User
from rest_framework import serializers
from users.models import Friends


class UserSerializer(serializers.ModelSerializer):
    date_joined = serializers.DateTimeField(format='%Y-%d-%m', read_only=True)
    email = serializers.EmailField()
    avatar = serializers.ImageField(max_length=None, use_url=True, required=False, default=None)

    # password = serializers.CharField(style={'input_type': 'password'}, write_only=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'email', 'avatar', 'city', 'date_joined', 'description')
        read_only_fields = ('id', 'date_joined', 'city')
        write_only_fields = ('first_name', 'last_name', 'email', 'username', 'avatar')
        # extra_kwargs = {
        #     'password': {'write_only': True}
        # }

    def create(self, validated_data):
        user = super(UserSerializer, self).create(validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user


class FriendSerializer(serializers.ModelSerializer):
    # friend = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())

    class Meta:
        model = Friends
        fields = ('id', 'user', 'friend')
        lookup_field = 'pk'




