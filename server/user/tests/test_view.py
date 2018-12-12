import json
import os

import requests
from django.core.files.uploadedfile import SimpleUploadedFile
from django.urls import reverse

from app.settings import MEDIA_ROOT
from utils.test import UserTestCase


class ChangeAvatarViewTestCase(UserTestCase):

    def test_upload_avatar(self):
        file = requests.get('https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584_960_720.png')
        image = SimpleUploadedFile('man-156584_960_720.png', file.content, content_type='image/png')
        avatar_res = self.client.put(reverse('auth-avatar-update'), {'avatar': image})
        self.assertEqual(avatar_res.status_code, 200)

        video_file = requests.get('https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4')
        video = SimpleUploadedFile('big_buck_bunny_720p_1mb.mp4', video_file.content, content_type='video/mp4')
        wrong_avatar_res = self.client.put(reverse('auth-avatar-update'), {'avatar': video})
        self.assertEqual(wrong_avatar_res.status_code, 400)
        self.assertEqual(
            wrong_avatar_res.data['avatar'][0].__str__(),
            'Upload a valid image. The file you uploaded was either not an image or a corrupted image.'
        )
        os.rmdir(MEDIA_ROOT)


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
            reverse('auth-profile-update'),
            json.dumps(req_data),
            content_type='application/json',
        )
        self.assertEqual(res_change_profile.status_code, 200)
