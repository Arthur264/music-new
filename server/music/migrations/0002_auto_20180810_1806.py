# Generated by Django 2.0 on 2018-08-10 18:06

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ('music', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='song',
            options={'ordering': ['-playcount_fm']},
        ),
    ]
