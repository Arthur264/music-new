from django.test import TestCase

from music.models import Song, Artist
from utils.test import UserTestCase


class SongViewTestCase(UserTestCase):
    def setUp(self):
        super().setUp()
        self.artist = Artist.objects.create(name='Miyagi')
        self.song = Song.objects.create(
            name="Sorry",
            url="http://zk.fm/song/21821432",
            artist=self.artist,
        )

    def test_add_play(self):
        response = self.client.get(f'/api/v1/song/{self.song.pk}/addplay/')
        self.check_response_user_song(response)

    def test_favorite(self):
        get_res = self.client.get(f'/api/v1/song/{self.song.pk}/favorite/')
        self.check_response_user_song(get_res)
        self.assertIn(self.user.pk, [i.pk for i in self.song.favorite.all()])

        delete_res = self.client.delete(f'/api/v1/song/{self.song.pk}/favorite/')
        self.check_response_user_song(delete_res)
        self.assertNotIn(self.user.pk, [i.pk for i in self.song.favorite.all()])

    def check_response_user_song(self, response):
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data.get('user'), self.user.pk)
        self.assertEqual(response.data.get('song'), self.song.pk)


class PlaylistViewTestCase(TestCase):
    def setUp(self):
        pass
