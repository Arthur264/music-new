# Generated by Django 2.0.8 on 2018-11-29 21:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('music', '0019_remove_song_time'),
    ]

    operations = [
        migrations.AddIndex(
            model_name='artist',
            index=models.Index(fields=['id'], name='music_artis_id_a6462a_idx'),
        ),
        migrations.AddIndex(
            model_name='song',
            index=models.Index(fields=['id'], name='music_song_id_82e124_idx'),
        ),
    ]
