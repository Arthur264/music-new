import os
import json
import asyncio
import pandas as pd
import numpy as np
import logging
from multiprocessing import Pool
from threading import Thread
from django.core.management.base import BaseCommand, CommandError
from music.models import Song, Artist
from music.serializers import SongSerializer, ArtistSerializer, SimilarArtistSerializer

                
class Command(BaseCommand):
    num_partitions = 5
    num_cores = 5
    folder_name = 'tmp'
    
    def add_arguments(self, parser):
        parser.add_argument('read_music_file', type=int, default=1)
    
    def handle(self, *args, **options):
        tasks = []
        music_files, artist_files = self.get_files(self.folder_name)
        
        read_music_file = options['read_music_file']
        
        tasks.append(self.get_chuck(self.load_artist, artist_files))
        
        if read_music_file:
            tasks.append(self.get_chuck(self.load_music, music_files))
            
        p = Pool(self.num_cores)
        for task in tasks:
            p.map(*task)
        p.close()
                
    def get_chuck(self,action, files):
        tasks = []
        for file_name in files:
            df = pd.read_json(file_name)
            df = df.where((pd.notnull(df)), None)
            tasks.extend(np.array_split(df, self.num_partitions))
        return (action, tasks) 
        
    def get_files(self, folder_name):
        music_files = []
        artist_files = []
        for path, subdirs, files in os.walk(self.folder_name):
            for file_name in files:
                file_path = os.path.join(path, file_name)
                if 'music' in file_path:
                    music_files.append(file_path)
                elif 'artist' in file_path:
                    artist_files.append(file_path)
                else:
                    continue
        return music_files, artist_files

    def load_artist(self, df_artist):
        for index, row in df_artist.iterrows():
            row_dict = row.to_dict()
            row_dict['tag'] = row_dict.get('tag', [])
            similars = row_dict.get('similar', [])
            th_similar = Thread(target=self.create_similar, args=(similar, ))
            th_artist = Thread(target=self.create_artist, args=(row_dict, ))
            th_similar.start()
            th_artist.start()
            logging.info('Artist ', index)
        return None
            
    def create_similar(self, similars):
        for similar in similars:
            similar_artist, _ = Artist.objects.get_or_create(name=similar['name'])
            similar_serializer = SimilarArtistSerializer(data={"first_artist":artist.pk, "second_artist":similar_artist.pk})
            if similar_serializer.is_valid():
                similar_serializer.save()
            logging.warning(artist_serializer.errors)
        return None
            
    def create_artist(self, row_dict):
        artist_serializer = ArtistSerializer(data=row_dict)
        if artist_serializer.is_valid():
            artist = artist_serializer.save()
        else:
            name = artist_serializer.errors.get('name')
            if name and name[0].code == 'unique':
                logging.warning(f'Not unique name: {name}')
                return None
            logging.warning(f'Errors: {artist_serializer.errors}')
            return None
            
    @staticmethod
    def load_music(df_music):
        for index, row in df_music.iterrows():
            row_dict = row.to_dict()
            artist, _ = Artist.objects.get_or_create(name=row_dict['artist'])
            row_dict.update({'artist_id': artist.pk})
            serializer_song = SongSerializer(data=row_dict)
            
            if serializer_song.is_valid():
                serializer_song.save()
                logging.warning('Music ', index)
            else:
                url = serializer_song.errors.get('url')
                if url and url[0].code == 'unique':
                    logging.warning('Not unique url', index)
                    continue
                name = serializer_song.errors.get('name')
                if name and name[0].code == 'max_length':
                    logging.warning('Max length name', index)
                    continue
                logging.warning(serializer_song.errors)
    
            
            
                