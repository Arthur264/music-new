import json
import os
from django.core.management.base import BaseCommand, CommandError
from music.models import Song, Artist

class Command(BaseCommand):
    artist_file = "artist.json"
    song_file = "song.json"

    def handle(self, *args, **options):
        
        artict = {}
        with open(self.artist_file, 'r') as parser_artist:
            count_artist = 0
            for i,k in enumerate(parser_artist):
                data = json.loads(k)
                new_artict = list(Artist.objects.filter(name=data['name'], image=data['image']).values("id"))[0]
                # new_artict.save()
                artict[data['id']] = new_artict['id']
                count_artist += 1
            print("Insert artist {}".format(count_artist))
                
        with open(self.song_file, 'r') as parser_songs:
            count_songs = 0
            for i,k in enumerate(parser_songs):
                if i < 1611853:
                    continue
                data = json.loads(k)
                artict_id = data['artict']
                new_song = Song(name=data['name'], url=data['url'], time=data['time'], artist_id=int(artict[artict_id]))
                new_song.save()
                count_songs += 1
            print("Insert song {}".format(count_songs))
            
                