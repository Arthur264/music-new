from django.test import TestCase
from music.models import Song, Artist 

class SongTestCase(TestCase):
    def setUp(self):
        artist = Artist.objects.create(name='John')
        
    def test_min_length_name(self):
        artist = Artist.objects.get(name='John')
        song = Song.objects.create(name="T", url="https://www.example.com/", time='1:23', artist=artist)
        self.assertGreaterEqual(len(song.name), 3)