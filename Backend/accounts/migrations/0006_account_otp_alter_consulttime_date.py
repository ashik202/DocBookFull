# Generated by Django 4.0.1 on 2023-01-11 04:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0005_consulttime_delete_consultingtime'),
    ]

    operations = [
        migrations.AddField(
            model_name='account',
            name='otp',
            field=models.CharField(blank=True, max_length=6, null=True),
        ),
        migrations.AlterField(
            model_name='consulttime',
            name='date',
            field=models.DateField(blank=True, max_length=50),
        ),
    ]