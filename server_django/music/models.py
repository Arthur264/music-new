from django.db import models

# Create your models here.
class Artist(models.Model):
    name = models.CharField(max_length=100, unique=True)
    image = models.CharField(max_length=500)
    
class Song(models.Model):
    name  = models.CharField(max_length=100)
    url = models.URLField()
    time = models.CharField(max_length=10)
    artist = models.ForeignKey(Artist, on_delete=models.CASCADE)
    
    @property
    def artist(self):
        pass
    
    @property
    def time_song(self):
        pass
        
