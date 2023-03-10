# Generated by Django 4.0.1 on 2023-02-24 06:24

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0018_packege'),
    ]

    operations = [
        migrations.CreateModel(
            name='RazorpayPayment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('startdate', models.DateField(auto_created=True)),
                ('enddate', models.DateField()),
                ('Packege', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='accounts.packege')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
