import os

import pandas as pd
from django.core.management.base import BaseCommand
from django.db import IntegrityError
from django.db.utils import DataError

from music.models import (
    Song,
    Artist,
)
from music.serializers import (
    ArtistSerializer,
    SimilarArtistSerializer,
)


class Command(BaseCommand):
    folder_name = 'tmp'

    def add_arguments(self, parser):
        parser.add_argument('read_music_file', type=int, default=1)

    def handle(self, *args, **options):
        read_music_file = options['read_music_file']
        music_files, artist_files = self.get_files()
        for df_music in self.get_chuck(music_files):
            self.process(df_music)

        if not read_music_file:
            for df_artist in self.get_chuck(artist_files):
                self.process_artist(df_artist)

    @staticmethod
    def get_chuck(files):
        for file_name in files:
            df = pd.read_json(file_name, lines=True, encoding='utf-8')
            yield df.where((pd.notnull(df)), None)

    def get_files(self):
        music_files = []
        artist_files = []
        for path, _, files in os.walk(self.folder_name):
            for file_name in files:
                file_path = os.path.join(path, file_name)
                if 'song' in file_path:
                    music_files.append(file_path)
                elif 'artist' in file_path:
                    artist_files.append(file_path)
                else:
                    continue

        return music_files, artist_files

    def process_artist(self, df_artist):
        for index, row in df_artist.iterrows():
            row_dict = row.to_dict()
            row_dict = {k: v.encode("utf-8") if isinstance(v, str) else v for k, v in row_dict.items()}
            row_dict['tag'] = row_dict.get('tag', [])
            similars = row_dict.get('similar', [])
            artist_serializer = ArtistSerializer(data=row_dict)
            if artist_serializer.is_valid():
                artist = artist_serializer.save()

            if not similars:
                return None

            for similar in similars:
                similar_artist, _ = Artist.objects.get_or_create(name=similar['name'])
                similar_serializer = SimilarArtistSerializer(
                    data={
                        "first_artist": artist.pk,
                        "second_artist": similar_artist.pk,
                    },
                )
                if similar_serializer.is_valid():
                    similar_serializer.save()
                else:
                    error = self.handler_error(similar_serializer)
                    print(error, index)
                    continue
        return None

    @staticmethod
    def process(df_music):
        for index, item in df_music.iterrows():
            row_dict = item.to_dict()
            row_dict['name'] = row_dict['name'].encode('utf-8')
            artist, _ = Artist.objects.get_or_create(name=row_dict['artist'])
            row_dict.update({'artist': artist})
            try:
                Song.objects.create(**row_dict)
                print('Song save: ', index)
            except (DataError, IntegrityError) as e:
                print(e)
                pass

    @staticmethod
    def handler_error(serializer):
        url = serializer.errors.get('url')
        if url and url[0].code == 'unique':
            return 'Not unique url'

        name = serializer.errors.get('name')
        if name and name[0].code == 'max_length':
            return 'Name max_length'

        return 'Error'
