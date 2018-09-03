from rest_framework import routers
from music.views import (
    SongViewSet, 
    ArtistViewSet, 
    TagViewSet,
    PlaylistViewSet
)
from account.views import AuthViewSet
app_name = "app"


router = routers.DefaultRouter()
router.register(r'song', SongViewSet, base_name='song')
router.register(r'artist', ArtistViewSet, base_name='artist')
router.register(r'tag', TagViewSet, base_name='tag')
router.register(r'auth', AuthViewSet, base_name='auth')
router.register(r'playlist', PlaylistViewSet, base_name='playlist')