# Generated by Django 3.2.5 on 2021-11-29 00:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('website', '0009_rename_username_ride_rider_name'),
    ]

    operations = [
        migrations.AddField(
            model_name='ride',
            name='user_name',
            field=models.CharField(default='', max_length=64),
        ),
    ]
