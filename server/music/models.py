from django.core.validators import MinLengthValidator
from django.db import models
from django.utils.text import slugify

from user.models import User
from core.models import BaseModel


class Tag(models.Model):
    name = models.CharField(max_length=35, unique=True, validators=[MinLengthValidator(3)])
    slug = models.SlugField(max_length=35, unique=True)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        self.slug = slugify(self.name)
        return super(Tag, self).save(*args, **kwargs)


class Artist(BaseModel):
    name = models.CharField(max_length=100, unique=True, validators=[MinLengthValidator(3)])
    image = models.URLField(max_length=500, null=True, blank=True)
    listeners_fm = models.IntegerField(null=True, blank=True)
    playcount_fm = models.IntegerField(null=True, blank=True)
    tag = models.ManyToManyField(Tag, related_name='artists', blank=True)
    published = models.DateField(null=True, blank=True)
    content = models.TextField(null=True, blank=True)

    class Meta:
        ordering = ['-listeners_fm']

    @property
    def all_songs(self):
        return Song.objects.filter(artist_id=self.id)

    def __str__(self):
        return self.name


class Song(BaseModel):
    name = models.CharField(max_length=100, validators=[MinLengthValidator(3)])
    url = models.URLField(unique=True)
    duration = models.IntegerField(null=True, blank=True)
    image = models.URLField(max_length=500, null=True, blank=True)
    listeners_fm = models.IntegerField(null=True, blank=True)
    playcount_fm = models.IntegerField(null=True, blank=True)
    favorite = models.ManyToManyField(User, related_name='favorite')
    artist = models.ForeignKey(Artist, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('name', 'artist')
        ordering = ['-listeners_fm']

    @property
    def listeners(self):
        return ListenerSong.objects.filter(song_id=self.id).count()

    @property
    def playcount(self):
        return ListenerSong.objects.filter(song_id=self.id).distinct()

    def __str__(self):
        return self.name


class Playlist(BaseModel):
    name = models.CharField(max_length=100, validators=[MinLengthValidator(3)])
    slug = models.SlugField(max_length=35, unique=True, default=None, null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    song = models.ManyToManyField(Song, related_name='playlist', blank=True)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        self.slug = slugify(self.name)
        return super(Playlist, self).save(*args, **kwargs)


class ListenerSong(BaseModel):
    user = models.ForeignKey(User, related_name='listener', on_delete=models.CASCADE)
    song = models.ForeignKey(Song, related_name='listener', on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.user.id}_{self.song.id}'
        
    @property
    def artist_id(self):
        return self.song.artist_id


class SimilarArtist(models.Model):
    first_artist = models.ForeignKey(Artist, on_delete=models.CASCADE)
    second_artist = models.ForeignKey(Artist, related_name='similar', on_delete=models.CASCADE)

    class Meta:
        unique_together = ('first_artist', 'second_artist')

    def __str__(self):
        return f'{self.first_artist} {self.second_artist}'
