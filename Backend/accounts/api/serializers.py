from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from accounts.models import Account,Docprofile,ConsultingTime



class UserProfileUpdate(serializers.ModelSerializer):
    class Meta:
        model=Account
        fields=['id','first_name','last_name','phone_number','email']
    def update(self,instance,validated_data):
        instance.first_name=validated_data.get('first_name',instance.first_name)
        instance.last_name=validated_data.get('last_name',instance.last_name)
        instance.email=validated_data.get('email',instance.email)
        instance.phone_number=validated_data.get('phone_number',instance.phone_number)
        instance.save()
        return instance


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = Account
        fields = ['first_name', 'last_name', 'email']


class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Account

        fields = ['id', 'username', 'first_name', 'last_name','phone_number',
                  'email', 'token', 'is_user', 'is_doctor', 'is_superadmin']

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)
    


class RegisterSerilizer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ['first_name', 'last_name', 'email',
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
        user.is_active = True
        user.is_user=True
        user.is_doctor=False
        user.save()
        return user

class DoctorRegisterSerilizer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ['first_name', 'last_name', 'email',
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
        user.is_active = True
        user.is_user=False
        user.is_doctor=True
        user.save()
        Docprofile.objects.create(user=user)
        return user

class DoctorProfileSerilizer(serializers.ModelSerializer):
    class Meta:
        model=Docprofile
        fields=['regno','specialization','clinic_name','Addressline1','Addressline2','link_of_map','district','state','completed']
        def create(self,validate_data):
            profile=Docprofile(
                regno=validate_data["regno"],
                specialization=validate_data["regno"],
                clinic_name=validate_data["clinic_name"],
                Addressline1=validate_data["Addressline1"],
                Addressline2=validate_data["Addressline2"],
                link_of_map=validate_data['link_of_map'],
                district=validate_data["district"],
                state=validate_data["state"],

            )
            profile.completed=True
            profile.save()
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

class ConsultingTimeSerializer(serializers.ModelSerializer):
    user=DoctorRegisterSerilizer(many=True)
    class Meta:
        model=ConsultingTime
        fields='__all__'
       