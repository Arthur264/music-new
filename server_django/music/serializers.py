from music.models import Song, Artist
from rest_framework import serializers

class ArtistSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Artist
        fields = ('id', 'name', 'image', 'url')

class SongSerializer(serializers.HyperlinkedModelSerializer):
    artist = ArtistSerializer()
    class Meta:
        model = Song
        fields = ('id', 'name', 'url', 'time', 'artist')
        
        


    