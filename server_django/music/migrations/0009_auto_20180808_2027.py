# Generated by Django 2.0 on 2018-08-08 20:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('music', '0008_auto_20180805_1945'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tag',
            name='name',
            field=models.CharField(max_length=35, unique=True),
        ),
    ]
