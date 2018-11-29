from django.core import serializers
from django.db.models import Q
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response

from .serializers import (
    UserSerializer,
    FriendSerializer,
    ProfileSerializer,
    AvatarSerializer)

from account.permissions import IsAdminOrIsSelf
from .models import User, Friends


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_field = 'pk'

    class Meta:
        model = User

    @action(methods=['get', 'post'], permission_classes=[IsAdminOrIsSelf], url_path='friends', detail=True)
    def friends(self, request, _):
        if request.method == 'GET':
            user = request.user.pk
            data = Friends.objects.filter(Q(user=user) | Q(friend=user)).filter(status=True)
            return Response(serializers.serialize('json', data))
        else:
            serializer = FriendSerializer(data={'user': request.user.pk, 'friend': request.POST['friend']})
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors)


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
