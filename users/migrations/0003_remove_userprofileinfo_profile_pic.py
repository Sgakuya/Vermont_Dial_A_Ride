# Generated by Django 3.2.5 on 2021-11-22 06:09

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_alter_userprofileinfo_profile_pic'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='userprofileinfo',
            name='profile_pic',
        ),
    ]