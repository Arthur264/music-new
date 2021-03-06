import json

import requests
from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import override_settings
from django.urls import reverse

from utils.test import UserTestCase


class ChangeAvatarViewTestCase(UserTestCase):

    @override_settings(MEDIA_ROOT='/tmp/django_test')
    def test_upload_avatar(self):
        file = requests.get('https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584_960_720.png')
        image = SimpleUploadedFile('man-156584_960_720.png', file.content, content_type='image/png')
        avatar_res = self.client.put(reverse('user-me-avatar-update'), {'avatar': image})
        self.assertEqual(avatar_res.status_code, 200)

        video_file = requests.get('https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4')
        video = SimpleUploadedFile('big_buck_bunny_720p_1mb.mp4', video_file.content, content_type='video/mp4')
        wrong_avatar_res = self.client.put(reverse('user-me-avatar-update'), {'avatar': video})
        self.assertEqual(wrong_avatar_res.status_code, 400)


class ChangeProfileViewTestCase(UserTestCase):
    def test_change_profile(self):
        req_data = {
            'username': 'admin',
            'first_name': 'tod',
            'last_name': 'braun',
            'email': 'tod@gmail.com',
            'city': 'New York',
            'phone': '+380956842347'
        }
        res_change_profile = self.client.put(
            reverse('user-me-profile-update'),
            json.dumps(req_data),
            content_type='application/json',
        )
        self.assertEqual(res_change_profile.status_code, 200)


class SocialNetworkViewTestCase(UserTestCase):
    def test_add_social_network(self):
        req_data = {
            'name': 'facebook',
            'link': 'https://www.facebook.com/',
        }
        res_change_profile = self.client.post(
            reverse('user-me-add-social-link'),
            json.dumps(req_data),
            content_type='application/json',
        )
        self.assertEqual(res_change_profile.status_code, 200)
