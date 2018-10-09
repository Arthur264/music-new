from django.test import TestCase
from user.models import User
from rest_framework.exceptions import ErrorDetail
from rest_framework.test import APIClient


class AccountViewTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='admin', password='12345')

    def test_login_logout_user(self):
        response = self.client.post(
            f'/api/v1/auth/login/',
            {
                'username': self.user.username,
                'password': '12345',
            }
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['user']['id'], self.user.pk)
        self.assertEqual(self.user.is_authenticated, True)

        self.factory = APIClient()
        self.factory.credentials(HTTP_AUTHORIZATION=f"Token {response.data['token']}")

        response_token = self.factory.get('/api/v1/auth/token/')
        self.assertEqual(response_token.status_code, 200)
        self.assertEqual(response.data['token'], response_token.data['token'])

        response_wrong = self.client.post(
            f'/api/v1/auth/login/',
            {
                'username': '',
                'password': '',
            }
        )
        self.assertEqual(response_wrong.status_code, 400)
        self.assertIsInstance(response_wrong.data['username'][0], ErrorDetail)
        self.assertIsInstance(response_wrong.data['password'][0], ErrorDetail)

        response_logout = self.factory.get(f'/api/v1/auth/logout/')
        self.assertEqual(response_logout.status_code, 200)
        self.assertEqual(self.user.is_authenticated, False)

    def test_register_user(self):
        response = self.client.post(
            f'/api/v1/auth/register/',
            {
                'username': 'admin1',
                'password': '12345',
                'email': 'admin@gmail.com'
            }
        )
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data['user']['username'], 'admin1')

        response_wrong = self.client.post(
            f'/api/v1/auth/register/',
            {
                'username': '',
                'password': '12345',
                'email': 'admingmail.com'
            }
        )
        self.assertEqual(response_wrong.status_code, 400)
        self.assertIsInstance(response_wrong.data['username'][0], ErrorDetail)
        self.assertIsInstance(response_wrong.data['email'][0], ErrorDetail)

    def test_change_password(self):
        pass


