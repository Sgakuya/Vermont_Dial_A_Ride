# Generated by Django 3.2.5 on 2021-11-29 01:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('website', '0011_alter_ride_user_name'),
    ]

    operations = [
        migrations.AddField(
            model_name='ride',
            name='contact_number',
            field=models.CharField(default='', max_length=30),
        ),
        migrations.AlterField(
            model_name='ride',
            name='destination',
            field=models.CharField(max_length=100),
        ),
        migrations.AlterField(
            model_name='ride',
            name='origin',
            field=models.CharField(max_length=100),
        ),
    ]
