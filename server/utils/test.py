from contextlib import contextmanager

from django.core.exceptions import ValidationError
from django.test import TestCase

from user.models import User


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


class UserTestCase(TestCase):
    username = 'admin'
    password = '12345'

    def setUp(self):
        self.user = User.objects.create_user(username=self.username, password=self.password)
        self.client.login(username=self.username, password=self.password)

    def tearDown(self):
        self.user.delete()

    def set_up_user(self):
        self.user = User.objects.get(username=self.username)
