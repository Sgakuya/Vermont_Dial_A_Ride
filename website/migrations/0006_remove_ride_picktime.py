# Generated by Django 3.2.5 on 2021-08-03 12:32

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('website', '0005_auto_20210802_2100'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='ride',
            name='pickTime',
        ),
    ]
