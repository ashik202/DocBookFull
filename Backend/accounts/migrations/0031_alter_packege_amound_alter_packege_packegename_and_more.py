# Generated by Django 4.0.1 on 2023-03-17 09:11

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0030_alter_packege_packeduration'),
    ]

    operations = [
        migrations.AlterField(
            model_name='packege',
            name='amound',
            field=models.IntegerField(validators=[django.core.validators.MinValueValidator(1)]),
        ),
        migrations.AlterField(
            model_name='packege',
            name='packegename',
            field=models.CharField(max_length=50, unique=True),
        ),
        migrations.AlterField(
            model_name='slotbooking',
            name='age',
            field=models.IntegerField(validators=[django.core.validators.MinValueValidator(1), django.core.validators.MaxValueValidator(100)]),
        ),
    ]