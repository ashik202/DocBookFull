# Generated by Django 4.0.1 on 2023-01-04 17:48

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0004_consultingtime'),
    ]

    operations = [
        migrations.CreateModel(
            name='ConsultTime',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.CharField(blank=True, max_length=50)),
                ('time_start', models.CharField(blank=True, max_length=50)),
                ('time_end', models.CharField(blank=True, max_length=30)),
                ('totaltoken', models.IntegerField()),
                ('token_booked', models.IntegerField(default=0)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.DeleteModel(
            name='ConsultingTime',
        ),
    ]