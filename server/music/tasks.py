import os

import pandas as pd
from celery import group
from celery.task import task
from django.db import IntegrityError
from django.db.utils import DataError

from app.celery import app
from app.settings import TMP_DIR
from music.models import (
    Song,
    Artist,
)
from music.serializers import ArtistSerializer, SimilarArtistSerializer


def handler_error(serializer):
    url = serializer.errors.get('url')
    if url and url[0].code == 'unique':
        return 'Not unique url'

    name = serializer.errors.get('name')
    if name and name[0].code == 'max_length':
        return 'Name max_length'

    return 'Error'


def get_chuck(files):
    for file_name in files:
        df = pd.read_json(file_name, lines=True, encoding='utf-8')
        yield df.where((pd.notnull(df)), None)


def get_files(name):
    result = []
    for path, _, files in os.walk(TMP_DIR):
        for file_name in files:
            file_path = os.path.join(path, file_name)
            if name in file_path:
                result.append(file_path)

    return result


@task(ignore_result=True)
def load_music(index, item):
    row_dict = item.to_dict()
    row_dict['name'] = row_dict['name'].encode('utf-8')
    artist, _ = Artist.objects.get_or_create(name=row_dict['artist'])
    row_dict.update({'artist': artist})
    try:
        Song.objects.create(**row_dict)
        print('Song save: ', index)
    except (DataError, IntegrityError) as e:
        print(e)
        pass


@app.task(ignore_result=True)
def load_artist(index, row):
    row_dict = row.to_dict()
    row_dict = {k: v.encode("utf-8") if isinstance(v, str) else v for k, v in row_dict.items()}
    row_dict['tag'] = row_dict.get('tag', [])
    similars = row_dict.get('similar', [])
    artist_serializer = ArtistSerializer(data=row_dict)
    if artist_serializer.is_valid():
        artist = artist_serializer.save()
    else:
        return None

    if not similars:
        return None

    for similar in similars:
        similar_artist, _ = Artist.objects.get_or_create(name=similar['name'])
        similar_serializer = SimilarArtistSerializer(
            data={
                "first_artist": artist.pk,
                "second_artist": similar_artist.pk,
            },
        )
        if similar_serializer.is_valid():
            similar_serializer.save()
        else:
            error = handler_error(similar_serializer)
            print(error, index)
            continue


@app.task(ignore_result=True)
def process_music():
    files = get_files('music')
    df = next(get_chuck(files))
    sub_tasks = [load_music.s(index, item) for index, item in df.iterrows()]
    return group(sub_tasks).apply()


@app.task(ignore_result=True)
def process_artist():
    files = get_files('artist')
    df = next(get_chuck(files))
    sub_tasks = [load_artist.s(index, item) for index, item in df.iterrows()]
    return group(sub_tasks).apply()
