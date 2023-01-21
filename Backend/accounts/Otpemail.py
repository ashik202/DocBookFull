from django.core.mail import send_mail
from .models import Account
from django.conf import settings
import random


def send_otp_via_email(email):
    print("email hello")
    subject='Your account veryfication email'
    otp=random.randint(1000,9999)
    print(otp)
    message=f'Your otp is{otp}'
    email_from=settings.EMAIL_HOST
    print(email,"email to")
    print(email_from,"email from")
    send_mail(subject,message,email_from,[email])
    user_obj=Account.objects.get(email=email)
    user_obj.otp=otp
    user_obj.save()
