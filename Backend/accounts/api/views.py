from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from accounts.models import Docprofile
from rest_framework.parsers import JSONParser
from django.contrib.auth.hashers import make_password
from rest_framework import status
from .serializers import UserSerializerWithToken, RegisterSerilizer, DoctorRegisterSerilizer, UserProfileUpdate, DoctorProfileSerilizer, ConsultTimeSerializer,AdminUserViewSerilizer,Userdoctorbookingserializer
from rest_framework.views import APIView
from accounts.models import Account, ConsultTime
from accounts.Otpemail import *
from django.db.models import F
import datetime


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

    def validate(self, attrs):
        data = super().validate(attrs)
        serializer = UserSerializerWithToken(self.user).data
        for k, v in serializer.items():
            data[k] = v

        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['GET'])
def getRouts(request):
    routs = [
        '/user/login',
        '/api/token/refresh',
        'user/registrar'
    ]
    return Response(routs)


class RegisterView(APIView):

    def post(self, request, format=None):

        serializer = RegisterSerilizer(data=request.data)
        print(serializer)
        if serializer.is_valid():
            serializer.save()
            send_otp_via_email(serializer.data['email'])
            data = serializer.data
            return Response(data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DocRegisterView(APIView):
    def post(self, request, format=None):
        serializer = DoctorRegisterSerilizer(data=request.data)
        print(serializer)
        if serializer.is_valid():
            print("hello")
            serializer.save()
            send_otp_via_email(serializer.data['email'])
            data = serializer.data
            return Response(data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class userProfileView(APIView):

    def put(self, request):
        print(request.data)
        id = request.data["id"]
        user = Account.objects.get(pk=id)
        if user is not None:
            serializer = UserProfileUpdate(user, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DoctorProfileview(APIView):
    def post(self, request):
        id = request.data["id"]
        print(id, "hello")
        user = Account.objects.get(pk=id)
        data = Docprofile.objects.get(user=user)
        if data is not None:
            serilizer = DoctorProfileSerilizer(data)

            return Response(serilizer.data, status=status.HTTP_201_CREATED)

        return Response(serilizer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request):
        id = request.data["id"]
        user = Account.objects.get(pk=id)
        datas = Docprofile.objects.get(user=user)
        if datas is not None:
            serializer = DoctorProfileSerilizer(datas, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class counsalting_time(APIView):
    def get(self, request, id):
        user = Account.objects.get(pk=id)
        cosultingtime = ConsultTime.objects.filter(user=user)
        print(cosultingtime)
        if cosultingtime is not None:
            serializer = ConsultTimeSerializer(cosultingtime, many=True)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request):
        print(request.data)
        id = request.data["id"]
        datas = ConsultTime.objects.get(pk=id)
        print(datas)
        if datas is not None:
            serializer = ConsultTimeSerializer(datas, data=request.data)

            if serializer.is_valid():

                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def post(self, request):
        user_id = request.data["id"]
        print(user_id)
        serializer = ConsultTimeSerializer(data=request.data, context={"user_id": user_id})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class singilcounsaltingtime(APIView):
    def post(self, request):
        print(request.data,)
        id = request.data["consult_id"]
        print(id)
        data = ConsultTime.objects.get(pk=id)
        if data is not None:
            serilizer = ConsultTimeSerializer(data)
            return Response(serilizer.data, status=status.HTTP_201_CREATED)
        return Response(serilizer.errors, status=status.HTTP_404_NOT_FOUND)

class adminuserview(APIView):
    def get(self,request):
        data=Account.objects.filter(is_user=True)
        if data is not None:
            serializer=AdminUserViewSerilizer(data,many=True)
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_404_NOT_FOUND)
    def post(self,request):
        id=(request.data["id"])
        user=Account.objects.get(pk=id)
        if user.is_active==True:
            user.is_active=False
        else:
            user.is_active=True
        user.save()
        serializer=AdminUserViewSerilizer(user)
        return Response(serializer.data,status=status.HTTP_201_CREATED)
class admindoctorview(APIView):
     def get(self,request):
        data=Account.objects.filter(is_doctor=True)
        if data is not None:
            serializer=AdminUserViewSerilizer(data,many=True)
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_404_NOT_FOUND)
     def post(self,request):
        id=(request.data["id"])
        user=Account.objects.get(pk=id)
        if user.is_active==True:
            user.is_active=False
        else:
            user.is_active=True
        user.save()
        serializer=AdminUserViewSerilizer(user)
        return Response(serializer.data,status=status.HTTP_201_CREATED)



class optverification(APIView):
    def post(self,request):

        id=request.data["id"]
        print(id)
        user=Account.objects.get(pk=id)
        if user.otp==request.data["otp"]:
            user.is_active=True
            user.save()
            return Response(status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)

class userconsultingtime(APIView):
    def get(self,request):
        start = datetime.date.today()
        end = start + datetime.timedelta(days=45)
        data=ConsultTime.objects.filter(token_booked__lt=F('totaltoken'),date__range=(start, end))
        print(data)
        selializer=Userdoctorbookingserializer(data,many=True)
        return Response(selializer.data,status=status.HTTP_200_OK)