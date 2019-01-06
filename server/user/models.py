from __future__ import unicode_literals

from django.conf import settings
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from phonenumber_field.modelfields import PhoneNumberField
from rest_framework.authtoken.models import Token


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)


class User(AbstractUser):
    avatar = models.ImageField(upload_to='media/avatar/', null=True, blank=True, default=None, max_length=500)
    is_blocked = models.BooleanField(default=False)
    description = models.CharField(max_length=200, null=True, blank=True)
    device = models.CharField(null=True, blank=True, max_length=50)
    city = models.CharField(max_length=100, null=True, blank=True)
    phone = PhoneNumberField(null=True, blank=True)
    timezone = models.CharField(null=True, blank=True, max_length=50)
    last_ip = models.GenericIPAddressField(protocol='IPv4', null=True, blank=True)
    social_network = models.ManyToManyField(
        'user.SocialNetwork',
        blank=True,
    )

    class Meta:
        db_table = 'user'


class SocialNetwork(models.Model):
    link = models.URLField(unique=True)
    create_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ('create_at',)
