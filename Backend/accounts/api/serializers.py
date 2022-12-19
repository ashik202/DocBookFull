from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from accounts.models import Account
from django.contrib.auth import get_user_model


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = Account
        fields = ['first_name', 'last_name', 'email',]


class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Account

        fields = ['id', 'first_name', 'last_name', 'email', 'token','is_user','is_doctor','is_superadmin']

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)
