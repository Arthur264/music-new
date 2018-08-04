import json
from django_filters.rest_framework import DjangoFilterBackend
from .serializers import SongSerializer, ArtistSerializer, SimilarArtistSerializer, TagSerializer
from rest_framework import viewsets, response
from .models import Song, Artist
from .filters import SongFilter
from .paginations import LargeResultsSetPagination, SongPagination

class SongViewSet(viewsets.ModelViewSet):
    serializer_class = SongSerializer
    queryset = Song.objects.all()
    pagination_class = SongPagination
    filter_backends = (DjangoFilterBackend,)
    filter_fields = ['name']
    search_fields = ('name')
    ordering_fields = ('name')
    ordering = ('name',)
    
    def create(self, request):
        serializer_data = request.data
        artist, _ = Artist.objects.get_or_create(name=request.data.get('artist'))
        serializer_data['artist'] = artist.pk
        serializer_song = SongSerializer(data=serializer_data, context={'request': request})
        if not serializer_song.is_valid():
            return response.Response(serializer_song.errors)
        return response.Response(serializer_song.data)
        

class ArtistViewSet(viewsets.ModelViewSet):
    serializer_class = ArtistSerializer
    queryset = Artist.objects.all()
    pagination_class = LargeResultsSetPagination
    filter_class = (DjangoFilterBackend,)
    filter_fields = ['name']
    search_fields = ('^name')
    ordering_fields = ('name')
    ordering = ('name',)
    
    def retrieve(self,request, pk):
        instance = self.get_object()
        serializer_artist = self.get_serializer(instance).data

        paginator = SongPagination()
        song_list = Song.objects.filter(artist_id=serializer_artist['id'])
        song_filter = SongFilter(request.GET, queryset=song_list).queryset
        result_page = paginator.paginate_queryset(song_filter, request)
        serializer_song = SongSerializer(result_page, many=True, context={'request': request})

        serializer_artist.update({'songs': paginator.get_paginated_data(serializer_song.data)})
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
    

