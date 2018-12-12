from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response

from account.permissions import IsAdminOrIsSelf
from .models import User
from .serializers import (
    UserSerializer,
    ProfileSerializer,
    AvatarSerializer,
    SocialNetworkSerializer,
)


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_field = 'pk'

    class Meta:
        model = User


class ProfileViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer

    @action(methods=['post'], permission_classes=[IsAdminOrIsSelf], url_path='update', detail=False)
    def profile_update(self, request):
        avatar_serializer = ProfileSerializer(data=request.data, partial=True)
        avatar_serializer.is_valid(raise_exception=True)
        avatar_serializer.save()
        return Response(status=status.HTTP_200_OK)

    @action(methods=['put'], permission_classes=[IsAdminOrIsSelf], url_path='avatar', detail=False)
    def avatar_update(self, request):
        avatar_serializer = AvatarSerializer(data=request.data, context={'request': request})
        avatar_serializer.is_valid(raise_exception=True)
        avatar_serializer.save()
        return Response(status=status.HTTP_200_OK)

    @action(methods=['post'], permission_classes=[IsAdminOrIsSelf], url_path='social_link', detail=False)
    def add_social_link(self, request):
        avatar_serializer = SocialNetworkSerializer(data=request.data, context={'request': request})
        avatar_serializer.is_valid(raise_exception=True)
        avatar_serializer.save()
        return Response(status=status.HTTP_200_OK)

    @action(methods=['delete'], permission_classes=[IsAdminOrIsSelf], url_path='social_link', detail=True)
    def remove_social_link(self, request):
        avatar_serializer = SocialNetworkSerializer(data=request.data, context={'request': request})
        avatar_serializer.is_valid(raise_exception=True)
        avatar_serializer.delete()
        return Response(status=status.HTTP_200_OK)
