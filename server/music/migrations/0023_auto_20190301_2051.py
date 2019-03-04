# Generated by Django 2.0.8 on 2019-03-01 20:51

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('music', '0022_song_hidden'),
    ]

    operations = [
        migrations.RemoveIndex(
            model_name='song',
            name='music_song_id_82e124_idx',
        ),
        migrations.AlterField(
            model_name='artist',
            name='name',
            field=models.CharField(db_index=True, max_length=100, unique=True, validators=[django.core.validators.MinLengthValidator(3)]),
        ),
        migrations.AlterField(
            model_name='song',
            name='name',
            field=models.CharField(db_index=True, max_length=100, validators=[django.core.validators.MinLengthValidator(3)]),
        ),
    ]