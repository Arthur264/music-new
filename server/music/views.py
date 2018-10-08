from django.db.models import Count
from rest_framework import viewsets, response
from rest_framework.decorators import action

from account.permissions import IsAdminOrIsSelf
from core.pagination import InfoPagination
from .filters import SongFilter
from .models import Song, Artist, Tag, Playlist
from .serializers import (
    SongSerializer,
    ArtistSerializer,
    SimilarArtistSerializer,
    TagSerializer,
    PlaylistSerializer,
    ListenerArtistSerializer,
    PlaylistTrackSerializer,
    FavoriteSerializer,
)


class PlaylistViewSet(viewsets.ModelViewSet):
    serializer_class = PlaylistSerializer
    lookup_field = 'slug'

    def get_queryset(self):
        return Playlist.objects.filter(user=self.request.user)

    def create(self, request):
        serializer_context = {
            'request': request,
        }
        serializer = PlaylistSerializer(data=request.data, context=serializer_context)
        serializer.is_valid(raise_exception=True)
        serializer.save(user=request.user)
        return response.Response(serializer.data)

    @action(methods=['post', 'delete'], permission_classes=[IsAdminOrIsSelf], url_path='tracks', detail=True)
    def add_track_to_playlist(self, request, slug):
        tracks = request.data.pop('tracks', [])
        serializer = PlaylistTrackSerializer(data={'tracks': tracks, 'slug': slug})
        serializer.is_valid(raise_exception=True)
        serializer.operation(request.method == 'POST')
        return response.Response(serializer.data)


class TagViewSet(viewsets.ModelViewSet):
    serializer_class = TagSerializer
    queryset = Tag.objects.annotate(q_count=Count('artists')).order_by('artists')
    lookup_field = 'slug'

    def retrieve(self, request, slug):
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
    filter_class = SongFilter
    ordering_fields = '__all__'

    def create(self, request):
        serializer_data = request.data
        artist, _ = Artist.objects.get_or_create(name=serializer_data.get('artist'))
        serializer_data.update({'artist_id': artist.pk})
        serializer_song = self.serializer_class(data=serializer_data, context={'request': request})

        serializer_song.is_valid(raise_exception=True)
        serializer_song.save()
        return response.Response(serializer_song.data)

    @action(methods=['get'], permission_classes=[IsAdminOrIsSelf], url_path='addplay', detail=True)
    def add_play(self, request, pk):
        serializer = ListenerArtistSerializer(data={'song': pk, 'user': request.user.pk})
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return response.Response(serializer.data)

    @action(methods=['get', 'delete'], permission_classes=[IsAdminOrIsSelf], url_path='addfavorite', detail=True)
    def add_favorite(self, request, pk):
        serializer = FavoriteSerializer(data={'song': pk}, context={'request': request})
        serializer.is_valid(raise_exception=True)
        serializer.operation(request.method == 'DELETE')
        return response.Response(serializer.data)


class ArtistViewSet(viewsets.ModelViewSet):
    serializer_class = ArtistSerializer
    queryset = Artist.objects.all()
    ordering_fields = '__all__'

    def retrieve(self, request, pk):
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
        artist_serializer.is_valid(raise_exception=True)
        artist = artist_serializer.save()
        result.update(artist_serializer.data)

        for similar in similars:
            similar_artist, _ = Artist.objects.get_or_create(name=similar['name'])
            data = {
                'first_artist': artist.pk,
                'second_artist': similar_artist.pk,
            }
            similar_serializer = SimilarArtistSerializer(data=data, context={'request': request})
            similar_serializer.is_valid(raise_exception=True)
            similar_serializer.save()
            result['similar'].append(similar_serializer.data)

        return response.Response(result)
