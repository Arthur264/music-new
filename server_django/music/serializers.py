from music.models import Song, Artist, Tag, Playlist, SimilarArtist
from rest_framework import serializers
from django.db.utils import IntegrityError
from django.utils.text import slugify

class SimilarArtistSerializer(serializers.ModelSerializer):
    class Meta:
        model = SimilarArtist
        fields = ('id', 'first_artist', 'second_artist')

class TagSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Tag
        fields = ('id', 'name', 'slug')
        read_only_fields = ('slug',)
        lookup_field = 'slug'
        extra_kwargs = {
            'name': {'validators': []},
        }
        
class PlaylistSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Playlist
        fields = ('id', 'name', 'user', 'song')
        
        
class ArtistSerializer(serializers.ModelSerializer):
    tag = TagSerializer(many=True,  required=False)
    published = serializers.DateField(format="%d %b %Y", input_formats=['%d %b %Y'], required=False, allow_null=True)
    class Meta:
        model = Artist
        fields = ('id', 'name', 'image', 'url', 'listeners_fm', 'playcount_fm', 
                'tag', 'published', 'content')
                
    def create(self, validated_data):
        tags = validated_data.pop('tag', [])
        instance = Artist.objects.create(**validated_data)
        for tag in tags:
            try:
                instance_tag, _ = Tag.objects.get_or_create(name=tag['name'])
            except IntegrityError:
                instance_tag = Tag.objects.get(slug=slugify(tag['name']))
            instance.tag.add(instance_tag)
        return instance
        
    def to_representation(self, instance):
        representation = super(ArtistSerializer, self).to_representation(instance)
        # representation['tags'] = TagSerializer(instance.tag.all(), many=True).data
        return representation 
                
    

class SongSerializer(serializers.ModelSerializer):
    artist = ArtistSerializer(read_only=True)
    artist_id = serializers.PrimaryKeyRelatedField(source='artist',  queryset=Artist.objects.all())
    class Meta:
        model = Song
        fields =  ('id', 'name', 'url', 'time','listeners_fm', 'playcount_fm', 'artist', 'artist_id')
        
        


    