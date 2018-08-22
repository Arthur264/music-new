# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.dispatch import receiver
from rest_framework.authtoken.models import Token
from django.conf import settings
from django.db.models.signals import post_save
from utils.models import BaseModel



# This code is triggered whenever a new user has been created and saved to the database
# @receiver(post_save, sender=settings.AUTH_USER_MODEL)
# def create_auth_token(sender, instance=None, created=False, **kwargs):
#     if created:
#         Token.objects.create(user=instance)


class User(AbstractUser):
    avatar = models.ImageField(null=True, blank=True, default=None, max_length=500)
    is_blocked = models.BooleanField(default=False)
    description = models.CharField(max_length=200, null=True, blank=True)
    device = models.CharField(null=True, blank=True, max_length=50)
    city = models.CharField(max_length=100, null=True, blank=True)
    phone = models.CharField(max_length=100, null=True, blank=True)
    timezone = models.CharField(null=True, blank=True, max_length=50)

    class Meta:
        db_table = 'user'


class Friends(BaseModel):
    user = models.ForeignKey(User, related_name='user',  on_delete=models.CASCADE)
    friend = models.ForeignKey(User, related_name="friends",  on_delete=models.CASCADE)
    status = models.BooleanField(default=False)

    class Meta:
        db_table = 'friends'
        unique_together = ('user', 'friend')

    # @classmethod
    # def make_friend(cls, user, friend):
    #     friend, created = cls.objects.get_or_create(user=user, friend=friend)
