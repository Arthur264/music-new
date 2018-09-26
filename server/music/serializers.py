from music.models import (
    Song, 
    Artist, 
    Tag, 
    Playlist, 
    SimilarArtist, 
    ListenerSong
)
from rest_framework import serializers
from django.db.utils import IntegrityError
from django.utils.text import slugify


class ListenerArtistSerializer(serializers.ModelSerializer):
    class Meta:
        model = ListenerSong
        fields = ('id', 'user', 'song')

class SimilarArtistSerializer(serializers.ModelSerializer):
    class Meta:
        model = SimilarArtist
        fields = ('id', 'first_artist', 'second_artist')

class TagSerializer(serializers.HyperlinkedModelSerializer):
    name = serializers.CharField(min_length=3)
    class Meta:
        model = Tag
        fields = ('id', 'name', 'slug')
        read_only_fields = ('slug',)
        lookup_field = 'slug'
        extra_kwargs = {
            'name': {'validators': []},
        }
        
class ArtistSerializer(serializers.ModelSerializer):
    name = serializers.CharField(min_length=3)
    tag = TagSerializer(many=True,  required=False)
    published = serializers.DateField(format="%d %b %Y", input_formats=['%d %b %Y'], required=False, allow_null=True)
    class Meta:
        model = Artist
        fields = ('id', 'name', 'image', 'url', 'listeners_fm', 'playcount_fm', 
                'tag', 'published', 'content')
        extra_kwargs = {
            'name': {'validators': []},
        }
                
    def create(self, validated_data):
        tags = validated_data.pop('tag', [])
        instance, _ = Artist.objects.update_or_create(name=validated_data.pop('name'), defaults=validated_data)
        for tag in tags:
            try:
                instance_tag, _ = Tag.objects.get_or_create(name=tag['name'])
            except IntegrityError:
                instance_tag = Tag.objects.get(slug=slugify(tag['name']))
            instance.tag.add(instance_tag)
        return instance

class SongSerializer(serializers.ModelSerializer):
    name = serializers.CharField(min_length=3)
    artist = ArtistSerializer(read_only=True)
    artist_id = serializers.PrimaryKeyRelatedField(source='artist',  queryset=Artist.objects.all())
    class Meta:
        model = Song
        fields =  ('id', 'name','image', 'url', 'duration', 'time','listeners_fm', 'playcount_fm', 'artist', 'artist_id')
        

class PlaylistSerializer(serializers.HyperlinkedModelSerializer):
    name = serializers.CharField(min_length=3)
    user = serializers.PrimaryKeyRelatedField(read_only=True, default=serializers.CurrentUserDefault())
    song = SongSerializer(many=True)
    class Meta:
        model = Playlist
        depth = 1
        lookup_field = 'slug'
        fields = ('id', 'name', 'slug', 'user', 'song')
    
    
class PlaylistTrackSerializer(serializers.Serializer):
    tracks = serializers.PrimaryKeyRelatedField(source='song',  queryset=Song.objects.all(), many=True)
    slug = serializers.SlugField()
    
    def to_internal_value(self, data):
        obj = super(PlaylistTrackSerializer, self).to_internal_value(data)
        instance_slug = data.get('slug', None)
        if instance_slug:
            instance = Playlist.objects.get(slug=instance_slug)
            if instance:
                obj['instance'] = instance
        return obj

    def save(self):
        tracks = self.validated_data['song']
        instance = self.validated_data['instance']
        for track in tracks:
            song_instance = Song.objects.get(pk=track.id)
            instance.song.add(song_instance)
        return instance
    
    def delete(self):
        tracks = self.validated_data['song']
        instance = self.validated_data['instance']
        for track in tracks:
            song_instance = Song.objects.get(pk=track.id)
            instance.song.remove(song_instance)
        return instance