from django.urls import reverse
from rest_framework.exceptions import ErrorDetail
from rest_framework.test import APIClient

from utils.test import UserTestCase


class AccountViewTestCase(UserTestCase):
    token = ''
    factory = APIClient()

    def test_login_logout_user(self):
        response = self.client.post(
            reverse('auth-login'),
            {
                'username': self.user.username,
                'password': '12345',
            }
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['user']['id'], self.user.pk)
        self.assertEqual(self.user.is_authenticated, True)

        self.login_user()
        response_token = self.factory.get(reverse('auth-token'))
        self.assertEqual(response_token.status_code, 200)
        self.assertEqual(response.data['token'], response_token.data['token'])

        response_wrong = self.client.post(
            reverse('auth-login'),
            {
                'username': '',
                'password': '',
            }
        )
        self.assertEqual(response_wrong.status_code, 400)
        self.assertIsInstance(response_wrong.data['username'][0], ErrorDetail)
        self.assertIsInstance(response_wrong.data['password'][0], ErrorDetail)

    def test_register_change_password_user(self):
        response = self.client.post(
            reverse('auth-register'),
            {
                'username': 'admin1',
                'password': '12345',
                'email': 'admin@gmail.com'
            }
        )
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data['user']['username'], 'admin1')

        response_wrong = self.client.post(
            reverse('auth-register'),
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
        self.login_user()
        new_password = 'x54qw52febuca9yq'
        response_change_password = self.factory.post(
            reverse('auth-set-password'),
            {
                'old_password': '12345',
                'new_password': new_password,
                'confirmed_password': new_password
            }
        )
        self.assertEqual(response_change_password.status_code, 200)
        self.set_up_user()
        self.assertEqual(self.user.check_password(new_password), True)

        response_change_password2 = self.factory.post(
            reverse('auth-set-password'),
            {
                'old_password': new_password,
                'new_password': 'x54qw52febuca9yq11',
                'confirmed_password': 'x54qw52febuca9yq1'
            }
        )
        self.assertEqual(response_change_password2.status_code, 400)
        self.assertEqual(
            response_change_password2.data['confirmed_password'][0].__str__(),
            'Password must be confirmed correctly.'
        )

    def test_logout(self):
        self.login_user()
        response_logout = self.factory.get(reverse('auth-logout-user'))
        self.assertEqual(response_logout.status_code, 200)

        response_wrong_token = self.factory.get(reverse('auth-token'))
        self.assertEqual(response_wrong_token.status_code, 401)
        self.assertEqual(response_wrong_token.data['detail'].code, 'authentication_failed')

    def login_user(self):
        response = self.client.post(
            reverse('auth-login'),
            {
                'username': self.user.username,
                'password': '12345',
            }
        )
        self.token = response.data['token']
        self.factory.credentials(HTTP_AUTHORIZATION=f"Token {self.token}")
