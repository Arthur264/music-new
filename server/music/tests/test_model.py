from django.test import TestCase
from utils.test import ValidationErrorTestMixin
from music.models import Song, Artist 
from user.models import User

class SongTestCase(ValidationErrorTestMixin, TestCase):
    def setUp(self):
        self.artist = Artist.objects.create(name='John')
        self.song = Song.objects.create(name="X Gon Give It To Ya", url="https://www.example.uk/", time='2:23', artist=self.artist)
        self.user1 = User.objects.create_user(username='testuser', password='12345')
        self.user2 = User.objects.create_user(username='testuser2', password='12345')
        
    def test_min_length_name(self):
        song = Song(name="T", url="https://www.example.com/", time='1:23', artist=self.artist)
        with self.assertValidationErrors(['name']):
            song.full_clean()
            
    def test_song_favorite(self):
        import pdb; pdb.set_trace()
        self.song.favorite.add(self.user1)
        self.song.favorite.add(self.user2)
        print( self.song)
            
            
