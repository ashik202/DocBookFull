from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db.models.deletion import CASCADE
from django.db.models.fields import DateTimeField
from payment.models import RazorpayPayment



# Create your models here.
class MyAccountManager(BaseUserManager):
    def create_user(self, first_name, last_name, email, username, password=None):
        if not email:
            raise ValueError('user must have an email address')
        if not username:
            raise ValueError('user must have an username')
        user = self.model(
            email=self.normalize_email(email),
            username=username,
            first_name=first_name,
            last_name=last_name,
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, first_name, last_name, email, username, password):
        user = self.create_user(
            email=self.normalize_email(email),
            username=username,
            password=password,
            first_name=first_name,
            last_name=last_name

        )
        user.is_admin = True
        user.is_active = True
        user.is_staff = True
        user.is_superadmin = True
        user.save(using=self._db)
        return user


class Account(AbstractBaseUser):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    username = models.CharField(max_length=50, unique=True)
    email = models.EmailField(max_length=100, unique=True)
    phone_number = models.CharField(max_length=100, default='')
    is_doctor=models.BooleanField(default=False)
    is_user=models.BooleanField(default=False)
    profile_picture=models.ImageField(blank=True,upload_to='userprofile',default='userprofile/Basic_Ui__28186_29_rsefEQP.jpg')
    otp=models.CharField(max_length=6,null=True,blank=True)
    # required
    date_joined = models.DateField(auto_now_add=True)
    last_login = models.DateField(auto_now=True)
    is_admin = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=False)
    is_superadmin = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'first_name', 'last_name']
    objects = MyAccountManager()


    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        return self.is_admin

    def has_module_perms(self, add_label):
        return True


class Docprofile(models.Model):
    user=models.OneToOneField(Account,on_delete=models.CASCADE)
    regno=models.IntegerField(blank=True,null=True)
    specialization=models.CharField(max_length=100,blank=True)
    clinic_name=models.CharField(max_length=100,blank=True)
    Addressline1=models.CharField(max_length=100,blank=True)
    Addressline2=models.CharField(max_length=100,blank=True)
    link_of_map=models.CharField(max_length=50,blank=True)
    district=models.CharField(max_length=30,blank=True)
    state=models.CharField(max_length=50,blank=True)
    completed=models.BooleanField(default=False)
    payment=models.BooleanField(default=False)
    slotadd=models.BooleanField(default=False)

class ConsultTime(models.Model):
    user=models.ForeignKey(Account,on_delete=models.CASCADE,related_name='time')
    doctordetails=models.ForeignKey(Docprofile,on_delete=models.CASCADE,null=True)
    date=models.DateField(blank=True,max_length=50)
    time_start=models.TimeField(blank=True,max_length=50)
    time_end=models.TimeField(blank=True,max_length=30)
    totaltoken=models.IntegerField()
    token_booked=models.IntegerField(default=0)
    def __str__(self):
        return self.user.username
class SlotBooking(models.Model):
    user=models.ForeignKey(Account,on_delete=CASCADE)
    doctordetails=models.ForeignKey(Docprofile,on_delete=models.CASCADE)
    consutime=models.ForeignKey(ConsultTime,on_delete=CASCADE)
    age=models.IntegerField()
    email=models.EmailField()
    patientname=models.CharField(max_length=50)
    token=models.CharField(max_length=20)
    
    

    def __str__(self):
        return self.patientname


class Packege(models.Model):
    packegename=models.CharField(max_length=50)
    packeduration=models.IntegerField()
    amound=models.IntegerField()


class SelcetedPakeg(models.Model):
    user=models.ForeignKey(Account,on_delete=CASCADE)
    packege=models.ForeignKey(Packege,on_delete=CASCADE)
    date=models.DateField(auto_now_add=True)
    enddate=models.DateField(default=None)
    payment=models.ForeignKey(RazorpayPayment,on_delete=CASCADE)
    