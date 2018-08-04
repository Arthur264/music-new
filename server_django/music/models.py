from django.db import models
from user.models import User
from utils.models import BaseModel

# Create your models here.

class Tag(models.Model):
    name = models.CharField(max_length=35, unique=True)
    slug = models.CharField(max_length=35)

    def __str__(self):
        return self.name
    
class Artist(BaseModel):
    name = models.CharField(max_length=100, unique=True)
    image = models.URLField(max_length=500, null=True, blank=True)
    listeners_fm = models.IntegerField(null=True, blank=True)
    playcount_fm = models.IntegerField(null=True, blank=True)
    tag = models.ManyToManyField(Tag, related_name='artists', blank=True)
    published = models.DateField(null=True, blank=True)
    summary = models.TextField(null=True, blank=True)
    content = models.TextField(null=True, blank=True)
    
    @property
    def all_songs(self):
        return Song.objects.filter(artist_id=self.id)
        
    def __str__(self):
        return self.name
    
class Song(BaseModel):
    name  = models.CharField(max_length=100)
    url = models.URLField(unique=True)
    time = models.CharField(max_length=10)
    listeners_fm = models.IntegerField(null=True, blank=True)
    playcount_fm = models.IntegerField(null=True, blank=True)
    artist = models.ForeignKey(Artist, on_delete=models.CASCADE)
    
    @property
    def listeners(self):
        return ListenerSong.objects.filter(song_id=self.id).count()
    
    @property
    def playcount(self):
        return ListenerSong.objects.filter(song_id=self.id).distinct()
    
    def __str__(self):
        return self.name
    
class Playlist(BaseModel):
    name = models.CharField(max_length=100)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    song = models.ManyToManyField(Song)
    
    def __str__(self):
        return self.name

class ListenerSong(BaseModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    song = models.ForeignKey(Song, on_delete=models.CASCADE)
    
    def __str__(self):
        return self.song
        
class SimilarArtist(models.Model):
    first_artist = models.ForeignKey(Artist, related_name='artist1', on_delete=models.CASCADE)
    second_artist = models.ForeignKey(Artist, related_name='artist2', on_delete=models.CASCADE)
    
    class Meta:
        unique_together = ("first_artist", "second_artist")
    