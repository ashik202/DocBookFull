# Generated by Django 4.0.1 on 2023-02-23 03:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0017_alter_consulttime_token_booked'),
    ]

    operations = [
        migrations.CreateModel(
            name='Packege',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('packegename', models.CharField(max_length=50)),
                ('packeduration', models.CharField(max_length=50)),
                ('amound', models.IntegerField()),
            ],
        ),
    ]
