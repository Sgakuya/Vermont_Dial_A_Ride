# Generated by Django 3.2.5 on 2021-12-02 13:06

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('website', '0013_ride_duration'),
    ]

    operations = [
        migrations.RenameField(
            model_name='ride',
            old_name='duration',
            new_name='trip_duration',
        ),
    ]