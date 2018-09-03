import json
from django.forms.models import model_to_dict
from django.db.models import Count
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.decorators import detail_route
from account.permissions import IsAdminOrIsSelf
from .serializers import (
    SongSerializer, 
    ArtistSerializer, 
    SimilarArtistSerializer, 
    TagSerializer,
    PlaylistSerializer,
    ListenerArtistSerializer
)
from rest_framework import viewsets, response
from .models import Song, Artist, Tag, Playlist
from .filters import SongFilter
from .paginations import LargeResultsSetPagination, InfoPagination

class PlaylistViewSet(viewsets.ModelViewSet):
    serializer_class = PlaylistSerializer
    pagination_class = InfoPagination
    
    def get_queryset(self):
        queryset = Playlist.objects.all().filter(user=self.request.user)
        return queryset
        
    def create(self, request):
        serializer_context = {
            'request': request,
        }
        serializer = PlaylistSerializer(data=request.data, context=serializer_context)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return response.Response(data=serializer.data)
        return response.Response(data=serializer.errors)

class TagViewSet(viewsets.ModelViewSet):
    serializer_class = TagSerializer
    pagination_class = InfoPagination
    queryset = Tag.objects.annotate(q_count=Count('artists')).order_by('artists')
    lookup_field = 'slug'
    
    def retrieve(self,request, slug):
        instance = self.get_object()
        serializer_tag = self.get_serializer(instance).data

        paginator = InfoPagination()
        result_page = paginator.paginate_queryset(instance.artists.all(), request)
        serializer_artist = ArtistSerializer(result_page, many=True, context={'request': request})

        serializer_tag.update({'items': paginator.get_paginated_data(serializer_artist.data)})
        return response.Response(serializer_tag)
        
class SongViewSet(viewsets.ModelViewSet):
    serializer_class = SongSerializer
    queryset = Song.objects.all()
    pagination_class = InfoPagination
    filter_backends = (DjangoFilterBackend,)
    filter_fields = ['name']
    search_fields = ('^name')
    ordering_fields = ('name')
    ordering = ('name',)
    
    def create(self, request):
        serializer_data = request.data
        artist, _ = Artist.objects.get_or_create(name=request.data.get('artist'))
        serializer_data.update({'artist_id': artist.pk})
        serializer_song = self.serializer_class(data=serializer_data, context={'request': request})
        
        if serializer_song.is_valid():
            serializer_song.save()
            return response.Response(serializer_song.data)
        return response.Response(serializer_song.errors)
        
    @detail_route(methods=['get'], permission_classes=[IsAdminOrIsSelf], url_path='addplay')
    def add_play(self, request, pk):
        serializer = ListenerArtistSerializer(data={'song': pk, 'user': request.user.pk})
        if serializer.is_valid():
            serializer.save()
            return response.Response(serializer.data)
        return response.Response(serializer.errors)
        
        

class ArtistViewSet(viewsets.ModelViewSet):
    serializer_class = ArtistSerializer
    queryset = Artist.objects.all()
    pagination_class = InfoPagination
    # filter_class = (DjangoFilterBackend,)
    # filter_fields = ['name']
    search_fields = ('name')
    ordering_fields = ('name')
    ordering = ('name',)
    
    def retrieve(self,request, pk):
        instance = self.get_object()
        serializer_artist = self.get_serializer(instance).data

        paginator = InfoPagination()
        song_list = Song.objects.filter(artist_id=serializer_artist['id'])
        song_filter = SongFilter(request.GET, queryset=song_list).queryset
        result_page = paginator.paginate_queryset(song_filter, request)
        serializer_song = SongSerializer(result_page, many=True, context={'request': request})

        serializer_artist.update({'items': paginator.get_paginated_data(serializer_song.data)})
        return response.Response(serializer_artist)
        
    def create(self, request):
        result = {'similar': []}
        similars = request.data.get('similar', [])
        artist_serializer = ArtistSerializer(data=request.data, context={'request': request})
        if not artist_serializer.is_valid():
            return response.Response(artist_serializer.errors)
           
        artist = artist_serializer.save()
        result.update(artist_serializer.data)
            
        for similar in similars:
            similar_artist, _ = Artist.objects.get_or_create(name=similar['name'])
            similar_serializer = SimilarArtistSerializer(data={"first_artist":artist.pk, "second_artist":similar_artist.pk}, context={'request': request})
            if not similar_serializer.is_valid():
                return response.Response(similar_serializer.errors)
            similar_serializer.save()
            result['similar'].append(similar_serializer.data)
                
        return response.Response(result)
    

