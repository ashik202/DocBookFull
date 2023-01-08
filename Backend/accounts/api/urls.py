from django.urls import path
from . import views
from . views import MyTokenObtainPairView,RegisterView,DocRegisterView,userProfileView,DoctorProfileview,counsalting_time,singilcounsaltingtime

from rest_framework_simplejwt.views import (
    
    TokenRefreshView,
)


urlpatterns = [
    path('',views.getRouts),
    path('user/login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('users/register/',RegisterView.as_view(),name='userregister'),
    path('doctor/register/',DocRegisterView.as_view(),name='doctoregister'),
    path('user/updateprofile/',userProfileView.as_view(),name='userprofileupdate'),
    path('doctor/profile/',DoctorProfileview.as_view(),name='doctor_Profile'),
    path('doctor/counsaltingtime/<int:id>',counsalting_time.as_view(),name='doctorCounsaltingtime'),
    path('doctor/counsaltingtime',counsalting_time.as_view(),name='doctorCounsaltingtimepost'),
    path('doctor/singileconsalttime/',singilcounsaltingtime.as_view(),name="doctorsingleconsulting")
    
]
