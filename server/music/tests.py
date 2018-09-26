from contextlib import contextmanager
from django.test import TestCase
from music.models import Song, Artist 
from django.core.exceptions import ValidationError

class ValidationErrorTestMixin(object):

    @contextmanager
    def assertValidationErrors(self, fields):
        """
        Assert that a validation error is raised, containing all the specified
        fields, and only the specified fields.
        """
        try:
            yield
            raise AssertionError("ValidationError not raised")
        except ValidationError as e:
            self.assertEqual(set(fields), set(e.message_dict.keys()))

class SongTestCase(ValidationErrorTestMixin, TestCase):
    def setUp(self):
        self.artist = Artist.objects.create(name='John')
        
    def test_min_length_name(self):
        song = Song(name="T", url="https://www.example.com/", time='1:23', artist=self.artist)
        with self.assertValidationErrors(['name']):
            song.full_clean()