from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.parsers import FormParser, JSONParser, MultiPartParser

from core.permissions import IsAdminOrIsSelf
from .models import User, SocialNetwork
from .serializers import (
    UserSerializer,
    ProfileSerializer,
    AvatarSerializer,
    SocialNetworkSerializer,
)
from core.permissions import IsAdminUserOrReadOnly
from music.mixins import PatchMixin


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (IsAdminUserOrReadOnly, )
    lookup_field = 'pk'

    class Meta:
        model = User


class ProfileViewSet(PatchMixin, viewsets.ModelViewSet):
    serializer_class = UserSerializer
    parser_classes = (FormParser, JSONParser, MultiPartParser)

    def get_queryset(self):
        return User.objects.filter(pk=self.request.user.pk)

    @action(methods=['put'], permission_classes=[IsAdminOrIsSelf], url_path='update', detail=False)
    def profile_update(self, request):
        avatar_serializer = ProfileSerializer(data=request.data, partial=True)
        avatar_serializer.is_valid(raise_exception=True)
        avatar_serializer.save()
        return Response(status=status.HTTP_200_OK)

    @action(methods=['post'], permission_classes=[IsAdminOrIsSelf], url_path='avatar', detail=False)
    def avatar_update(self, request):
        avatar_serializer = AvatarSerializer(data=request.FILES, context={'request': request})
        avatar_serializer.is_valid(raise_exception=True)
        avatar_serializer.save()
        return Response(status=status.HTTP_200_OK)


class SocialNetworkViewSet(viewsets.ModelViewSet):
    queryset = SocialNetwork.objects.all()
    serializer_class = SocialNetworkSerializer

