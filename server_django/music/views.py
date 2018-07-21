import json
from django_filters.rest_framework import DjangoFilterBackend
from .serializers import SongSerializer, ArtistSerializer
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
    
    

