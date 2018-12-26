from rest_framework import routers

from account.views import AuthViewSet
from user.views import (
    UserViewSet,
    ProfileViewSet,
    SocialNetworkViewSet,
)
from music.views import (
    SongViewSet,
    ArtistViewSet,
    TagViewSet,
    PlaylistViewSet,
    FavoriteViewSet,
    SearchViewSet,
)

app_name = 'app'

router = routers.DefaultRouter()
router.register(r'song', SongViewSet, base_name='song')
router.register(r'artist', ArtistViewSet, base_name='artist')
router.register(r'tag', TagViewSet, base_name='tag')
router.register(r'user/me/social_link', SocialNetworkViewSet, base_name='user-me-social-link')
router.register(r'user/me', ProfileViewSet, base_name='user-me')
router.register(r'user', UserViewSet, base_name='user')
router.register(r'auth', AuthViewSet, base_name='auth')
router.register(r'playlist', PlaylistViewSet, base_name='playlist')
router.register(r'favorite', FavoriteViewSet, base_name='favorite')
router.register(r'search', SearchViewSet, base_name='search')
