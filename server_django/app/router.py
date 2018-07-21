from rest_framework import routers
from music.views import SongViewSet, ArtistViewSet
app_name = "app"


router = routers.DefaultRouter()
router.register(r'song', SongViewSet, base_name='song')
router.register(r'artist', ArtistViewSet, base_name='artist')