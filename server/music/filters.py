import django_filters

from music.models import Song


class SongFilter(django_filters.FilterSet):
    name = django_filters.CharFilter(lookup_expr='icontains')

    class Meta:
        model = Song
        fields = ['id', 'name']
