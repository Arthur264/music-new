from django.db import models
# from utils.models import BaseModel
# Create your models here.
class Artist(models.Model):
    name = models.CharField(max_length=100, unique=True)
    image = models.CharField(max_length=500)
    
    @property
    def all_songs(self):
        return Song.objects.filter(artist_id=self.id)
    
class Song(models.Model):
    name  = models.CharField(max_length=100)
    url = models.URLField()
    time = models.CharField(max_length=10)
    artist = models.ForeignKey(Artist, on_delete=models.CASCADE)
    