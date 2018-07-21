from music.models import Song, Artist
from rest_framework import serializers


class SongSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Song
        fields = ('id', 'name', 'url', 'time', 'artist')
        
        
class ArtistSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Artist
        fields = ('id', 'name', 'image', 'url')

    