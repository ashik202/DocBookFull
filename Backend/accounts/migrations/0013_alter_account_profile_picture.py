# Generated by Django 4.0.1 on 2023-01-21 04:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0012_alter_account_profile_picture'),
    ]

    operations = [
        migrations.AlterField(
            model_name='account',
            name='profile_picture',
            field=models.ImageField(blank=True, default='userprofile/252331.png', upload_to='userprofile'),
        ),
    ]
