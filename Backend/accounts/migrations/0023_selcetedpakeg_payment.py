# Generated by Django 4.0.1 on 2023-02-25 14:47

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('payment', '0001_initial'),
        ('accounts', '0022_docprofile_payment'),
    ]

    operations = [
        migrations.AddField(
            model_name='selcetedpakeg',
            name='payment',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='payment.razorpaypayment'),
        ),
    ]
