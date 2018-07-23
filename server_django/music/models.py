from django.db import models
from user.models import User
# from utils.models import BaseModel

# Create your models here.

class Tag(models.Model):
    name = models.CharField(max_length=35, unique=True)
    slug = models.CharField(max_length=35)

    def __str__(self):
        return self.name
    
class Artist(models.Model):
    name = models.CharField(max_length=100, unique=True)
    image = models.URLField(max_length=500)
    tag = models.ManyToManyField(Tag, related_name='artists')
    
    @property
    def all_songs(self):
        return Song.objects.filter(artist_id=self.id)
        
    def __str__(self):
        return self.name
    
class Song(models.Model):
    name  = models.CharField(max_length=100)
    url = models.URLField()
    time = models.CharField(max_length=10)
    artist = models.ForeignKey(Artist, on_delete=models.CASCADE)
    
    def __str__(self):
        return self.name
    
class Playlist(models.Model):
    name = models.CharField(max_length=100)
    user = models.ForeignKey(User, related_name='playlist', on_delete=models.CASCADE)
    song = models.ManyToManyField(Song, related_name='playlist')
    
    def __str__(self):
        return self.name
    