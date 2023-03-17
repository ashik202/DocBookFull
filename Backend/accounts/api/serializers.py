from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from accounts.models import Account,Docprofile,ConsultTime,SlotBooking,Packege,SelcetedPakeg
from payment.models import RazorpayPayment
from accounts.Otpemail import * 



class UserProfileUpdate(serializers.ModelSerializer):
    class Meta:
        model=Account
        fields=['id','first_name','last_name','phone_number','email','profile_picture']
    def update(self,instance,validated_data):
        instance.first_name=validated_data.get('first_name',instance.first_name)
        instance.last_name=validated_data.get('last_name',instance.last_name)
        instance.email=validated_data.get('email',instance.email)
        instance.phone_number=validated_data.get('phone_number',instance.phone_number)
        instance.profile_picture=validated_data.get('profile_picture',instance.profile_picture)
        instance.save()
        return instance


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = Account
        fields = ['first_name', 'last_name', 'email',]


class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Account

        fields = ['id', 'username', 'first_name', 'last_name','phone_number',
                  'email', 'token', 'is_user', 'is_doctor', 'is_superadmin','profile_picture']

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)
    


class RegisterSerilizer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ['id','first_name', 'last_name', 'email',
                   'phone_number','password','is_user','is_doctor']
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validate_data):
        user = Account(
            first_name=validate_data["first_name"],
            last_name=validate_data["last_name"],
            email=validate_data["email"],
            phone_number=validate_data["phone_number"],
            username=validate_data["email"].split('@')[0],
        )
        user.set_password(validate_data["password"])
        user.is_user=True
        user.is_doctor=False
        user.save()
        return user



class DoctorProfileSerilizer(serializers.ModelSerializer):
    class Meta:
        model=Docprofile
        fields=['id','regno','specialization','clinic_name','Addressline1','Addressline2','link_of_map','district','state','completed','payment']
       
        def update(self,instance,validated_data):
            instance.regno=validated_data.get('regno',instance.regno)
            instance.specialization=validated_data.get('specialization',instance.specialization)
            instance.clinic_name=validated_data.get('clinic_name',instance.clinic_name)
            instance.Addressline1=validated_data.get('Addressline1',instance.Addressline1)
            instance.Addressline2=validated_data.get('Addressline2',instance.Addressline2)
            instance.link_of_map=validated_data.get('link_of_map',instance.link_of_map)
            instance.district=validated_data.get('district',instance.district)
            instance.state=validated_data.get('state',instance.state)
            instance.save()
            return instance

class DoctorRegisterSerilizer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ['id','first_name', 'last_name', 'email',
                   'phone_number','password','is_user','is_doctor',]
        extra_kwargs = {"password": {"write_only": True}}


    def create(self, validate_data):
        user = Account(
            first_name=validate_data["first_name"],
            last_name=validate_data["last_name"],
            email=validate_data["email"],
            phone_number=validate_data["phone_number"],
            username=validate_data["email"].split('@')[0],
            
        )
        
        
        
        user.set_password(validate_data["password"])
        user.is_user=False
        user.is_doctor=True
        user.save()
        Docprofile.objects.create(user=user)
        return user




class ConsultTimeSerializer(serializers.ModelSerializer):
    
   
    
    class Meta:
        model=ConsultTime
        fields=['id','token_booked','totaltoken','time_end','time_start','date',]
    def create(self, validated_data):

        id=self.context.get("user_id")
        print(id,'hello')
        users=Account.objects.get(pk=id),
        consultingtime=ConsultTime(
            user=Account.objects.get(pk=id),
            doctordetails=Docprofile.objects.get(user=id),
            date=validated_data["date"],
            time_start=validated_data["time_start"],
            time_end=validated_data["time_end"],
            totaltoken=validated_data["totaltoken"]

            )
        consultingtime.save()
        return consultingtime
        
    def update(self, instance, validated_data):
        instance.token_booked=validated_data.get('token_booked',instance.token_booked)
        instance.totaltoken=validated_data.get('totaltoken',instance.totaltoken)
        instance.time_end=validated_data.get('time_end',instance.time_end)
        instance.time_start=validated_data.get('time_start',instance.time_start)
        instance.date=validated_data.get('date',instance.date)
        instance.save()
        return instance
        



class AdminUserViewSerilizer(serializers.ModelSerializer):
    class Meta:
        model=Account
        fields='__all__'
        extra_kwargs = {"password": {"write_only":True}}


class Userdoctorbookingserializer(serializers.ModelSerializer):
    doctor_id=serializers.ReadOnlyField(source='user.id')
    doctordetail_id=serializers.ReadOnlyField(source='doctordetails.id')
    first_name=serializers.ReadOnlyField(source='user.first_name')
    last_name=serializers.ReadOnlyField(source='user.last_name')
    profilpic=serializers.ImageField(source='user.profile_picture')
    specialization=serializers.ReadOnlyField(source='doctordetails.specialization')
    clinic_name=serializers.ReadOnlyField(source='doctordetails.clinic_name')
    Addressline1=serializers.ReadOnlyField(source="doctordetails.Addressline1")
    Addressline2=serializers.ReadOnlyField(source="doctordetails.Addressline2")
    district=serializers.ReadOnlyField(source="doctordetails.district")

    class Meta:
        model=ConsultTime
        fields=['id','date','time_start','time_end','token_booked','first_name','last_name','clinic_name','Addressline1','Addressline2','specialization','district','profilpic','doctordetail_id','doctor_id']

class UserProfilePicSerializer(serializers.ModelSerializer):
    print("here")
    profile_picture=serializers.ImageField(required=False)
    
    class Meta:
        model = Account
        fields = ["profile_picture"]

class SlotBookingSerializer(serializers.ModelSerializer):
    class Meta:
        model=SlotBooking
        fields=["id","consutime","doctordetails","user","patientname","age","email"]
        
        
        def create(self, validated_data):
            token_id = self.context.get("token_id")
            slotbooking = SlotBooking.objects.create(
            patientname=validated_data["patientname"],
            email=validated_data["email"],
            age=validated_data["age"],
            user=validated_data["user"],
            doctordetails=validated_data["doctordetails"],
            consutime=validated_data["consutime"],
           
        )
            return slotbooking
        
        def validate(self,data):
            age=data.get('age')
            if age and age<1:
                raise serializers.ValidationError('Enter A valid Age')
            return age
            
       
class UserBokkingViewSerializer(serializers.ModelSerializer):
    doctorfirst_name=serializers.ReadOnlyField(source='doctordetails.user.first_name')
    user_name=serializers.ReadOnlyField(source='user.first_name')
    doctorlast_name=serializers.ReadOnlyField(source='doctordetails.user.last_name')
    profile_picture=serializers.ImageField(source='doctordetails.user.profile_picture')
    specialization=serializers.ReadOnlyField(source='doctordetails.specialization')
    clinic_name=serializers.ReadOnlyField(source='doctordetails.clinic_name')
    Addressline1=serializers.ReadOnlyField(source='doctordetails.Addressline1')
    Addressline2=serializers.ReadOnlyField(source='doctordetails.Addressline2')
    district=serializers.ReadOnlyField(source='doctordetails.district')
    state=serializers.ReadOnlyField(source='doctordetails.state')
    date=serializers.ReadOnlyField(source='consutime.date')
    time_start=serializers.ReadOnlyField(source='consutime.time_start')
    time_end=serializers.ReadOnlyField(source='consutime.time_end')

    
    class Meta:
        model=SlotBooking
        fields=['id','doctorfirst_name',"doctorlast_name",'profile_picture','clinic_name','Addressline1','Addressline2','district','state','patientname','token','age','time_start','time_end','date','specialization','email','user_name']



class DoctorinfoSerializer(serializers.ModelSerializer):
    doctor_id=serializers.ReadOnlyField(source='user.id')
    doctorfirst_name=serializers.ReadOnlyField(source='user.first_name')
    doctorlast_name=serializers.ReadOnlyField(source='user.last_name')
    profile_picture=serializers.ImageField(source='user.profile_picture')
    class Meta:
        model=Docprofile
        fields=['id','doctor_id','doctorfirst_name',"doctorlast_name",'clinic_name','Addressline1','Addressline2','district','state','profile_picture','specialization']

class PakckegeSerilizer(serializers.ModelSerializer):
    class Meta:
        model=Packege
        fields='__all__'
class RazorPAySerializer(serializers.ModelSerializer):
    class Meta:
        model=RazorpayPayment
        fields="__all__"
class PackegeViewSerializer(serializers.ModelSerializer):
    packege=PakckegeSerilizer()
    user=DoctorRegisterSerilizer()
    payment=RazorPAySerializer()
    
    class Meta:
        model=SelcetedPakeg
        fields=['id','user',"payment",'date','packege','enddate']

class MessageUserSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Account
        fields = ['first_name','username']