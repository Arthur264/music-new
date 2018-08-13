import json
import pandas as pd
import numpy as np
from multiprocessing import Pool
import os
from django.core.management.base import BaseCommand, CommandError
from music.models import Song, Artist
from music.serializers import SongSerializer, ArtistSerializer, SimilarArtistSerializer

                
class Command(BaseCommand):
    num_partitions = 4
    num_cores = 4 
    
        
    def handle(self, *args, **options):
        df_music = pd.read_json('music.json')
        df_music = df_music.where((pd.notnull(df_music)), None)
        df_music_split = np.array_split(df_music, self.num_partitions)
        df_artist = pd.read_json('artist.json')
        df_artist = df_artist.where((pd.notnull(df_artist)), None)
        df_artist_split = np.array_split(df_artist, self.num_partitions)
        
        with Pool(self.num_cores) as p:
            p.map(self.load_artist, df_artist_split)
            p.map(self.load_music, df_music_split)
        
    @staticmethod
    def load_artist(df_artist):
        for index, row in df_artist.iterrows():
            row_dict = row.to_dict()
            row_dict['tag'] = row_dict.get('tag') or []
            similars = row_dict.get('similar') or []
            artist_serializer = ArtistSerializer(data=row_dict)
            if artist_serializer.is_valid():
                artist = artist_serializer.save()
            else:
                name = artist_serializer.errors.get('name')
                if name and name[0].code == 'unique':
                    print('Not unique name', index)
                    continue
                print("Errors:", artist_serializer.errors)
                
            for similar in similars:
                similar_artist, _ = Artist.objects.get_or_create(name=similar['name'])
                similar_serializer = SimilarArtistSerializer(data={"first_artist":artist.pk, "second_artist":similar_artist.pk})
                if similar_serializer.is_valid():
                    similar_serializer.save()
                else:
                    print(artist_serializer.errors)
                    
            print('Artist ', index)
            
    @staticmethod
    def load_music(df_music):
        for index, row in df_music.iterrows():
            row_dict = row.to_dict()
            artist, _ = Artist.objects.get_or_create(name=row_dict['artist'])
            row_dict.update({'artist_id': artist.pk})
            serializer_song = SongSerializer(data=row_dict)
            
            if serializer_song.is_valid():
                serializer_song.save()
                print('Music ', index)
            else:
                url = serializer_song.errors.get('url')
                if url and url[0].code == 'unique':
                    print('Not unique url', index)
                    continue
                name = serializer_song.errors.get('name')
                if name and name[0].code == 'max_length':
                    print('Max length name', index)
                    continue
                print(serializer_song.errors)
    
            
            
                