from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from accounts.models import Account
from rest_framework.parsers import JSONParser
from django.contrib.auth.hashers import make_password
from rest_framework import status
from .serializers import UserSerializer, UserSerializerWithToken


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

    def validate(self, attrs):
        data = super().validate(attrs)
        serializer=UserSerializerWithToken(self.user).data
        for k, v in serializer.items():
            data[k]=v
        print(data)

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


@api_view(['POST'])
def user_register(request):

    data = JSONParser().parse(request)
    print(data)
    username_set = data['email']
    user = Account.objects.create(
        first_name=data['first_name'],
        last_name=data['last_name'],
        email=data['email'],
        phone_number=data['phone_number'],
        username=username_set.split("@")[0],
        password=make_password(data['password']),
        is_user=True,
        is_active=True
    )
    message = {
        'detail': 'user created successfully'
    }
    return Response(message, status=status.HTTP_200_OK)


@api_view(['POST'])
def doctor_rgister(request):
    data = JSONParser().parse(request)
    print(data)
    username_set = data['email']
    user = Account.objects.create(
        first_name=data['first_name'],
        last_name=data['last_name'],
        email=data['email'],
        phone_number=data['phone_number'],
        username=username_set.split("@")[0],
        password=make_password(data['password']),
        is_doctor=True,
        is_active=True
    )
    message = {
        'detail': 'user created successfully'
    }
    return Response(message, status=status.HTTP_200_OK)