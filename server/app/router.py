from rest_framework import routers

from account.views import AuthViewSet
from user.views import UserViewSet, ProfileViewSet
from music.views import (
    SongViewSet,
    ArtistViewSet,
    TagViewSet,
    PlaylistViewSet,
    FavoriteViewSet,
)

app_name = 'app'

router = routers.DefaultRouter()
router.register(r'song', SongViewSet, base_name='song')
router.register(r'artist', ArtistViewSet, base_name='artist')
router.register(r'tag', TagViewSet, base_name='tag')
router.register(r'user', UserViewSet, base_name='user')
router.register(r'user/me', ProfileViewSet, base_name='user')
router.register(r'auth', AuthViewSet, base_name='auth')
router.register(r'playlist', PlaylistViewSet, base_name='playlist')
router.register(r'favorite', FavoriteViewSet, base_name='favorite')
router.register(r'search', FavoriteViewSet, base_name='search')
router.register(r'profile', FavoriteViewSet, base_name='profile')
