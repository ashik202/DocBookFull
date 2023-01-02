from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from accounts.models import Docprofile
from rest_framework.parsers import JSONParser
from django.contrib.auth.hashers import make_password
from rest_framework import status
from .serializers import  UserSerializerWithToken,RegisterSerilizer,DoctorRegisterSerilizer,UserProfileUpdate,DoctorProfileSerilizer,ConsultingTimeSerializer
from rest_framework.views import APIView
from accounts.models import Account


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

    def validate(self, attrs):
        data = super().validate(attrs)
        serializer=UserSerializerWithToken(self.user).data
        for k, v in serializer.items():
            data[k]=v
        

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
            print("hello")
            serializer.save()
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
            
            data = serializer.data
            return Response(data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class userProfileView(APIView):

    def put(self,request):
        print(request.data)
        id=request.data["id"]
        user=Account.objects.get(pk=id)
        if user is not None:
            serializer=UserProfileUpdate(user,data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data,status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
class DoctorProfileview(APIView):
    def post(self,request):
        id=request.data["id"]
        print(id,"hello")
        user=Account.objects.get(pk=id)
        data=Docprofile.objects.get(user=user)
        if data is not None:
            serilizer=DoctorProfileSerilizer(data)
            
            return Response(serilizer.data,status=status.HTTP_201_CREATED)
               
        return Response(serilizer.errors,status=status.HTTP_400_BAD_REQUEST)
    def put(self,request):
         id=request.data["id"]
         
         user=Account.objects.get(pk=id)
         datas=Docprofile.objects.get(user=user)
         if datas is not None:
            serializer=DoctorProfileSerilizer(datas,data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data,status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
class counsalting_time(APIView):
    def post(self,request):
        print(request.data)
        serializer=ConsultingTimeSerializer(data=request.data)
        print(serializer)
        if serializer.is_valid():
            serializer.save()
            return  Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

            



        
    
   