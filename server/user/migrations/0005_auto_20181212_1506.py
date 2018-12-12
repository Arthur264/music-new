# Generated by Django 2.0.8 on 2018-12-12 15:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0004_auto_20181211_1547'),
    ]

    operations = [
        migrations.CreateModel(
            name='SocialNetwork',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('slug', models.SlugField(unique=True)),
                ('link', models.URLField(unique=True)),
                ('create_at', models.DateTimeField(auto_now_add=True)),
            ],
            options={
                'ordering': ('create_at',),
            },
        ),
        migrations.AddField(
            model_name='user',
            name='social_network',
            field=models.ManyToManyField(blank=True, to='user.SocialNetwork'),
        ),
    ]
