# Generated by Django 2.0 on 2018-08-05 09:16

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('music', '0005_listenersong'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='artist',
            name='summary',
        ),
    ]