import json
from django.core.management.base import BaseCommand, CommandError
from music.models import Song, Artist

class Command(BaseCommand):
    artist_file = "artist.json"
    song_file = "song.json"

    def handle(self, *args, **options):
        
        artict = {}
        with open(self.artist_file, 'r') as parser_artist:
            for i,k in enumerate(parser_artist):
                data = json.loads(k)
                new_artict = Artist(name=data['name'], image=data['image'])
                new_artict.save()
                artict[data['id']] = new_artict.pk
            print("Insert artist {}".format(os.stat(self.artist_file).st_size))
                
        with open(self.song_file, 'r') as parser_songs:
            for i,k in enumerate(parser_songs):
                data = json.loads(k)
                artict_id = data['artict']
                new_song = Song(name=data['name'], url=data['url'], time=data['time'], artist=artict[artict_id])
                new_song.save()
            print("Insert song {}".format(os.stat(self.song_file).st_size))
            
                