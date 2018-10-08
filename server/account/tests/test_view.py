from django.test import TestCase
from user.models import User


class AccountViewTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='admin', password='12345')

    def test_login_user(self):
        response = self.client.post(
            f'/api/v1/auth/login/',
            {
                'username': self.user['username'],
                'password': self.user['password'],
            }
        )
        self.assertEqual(response.status_code, 200)