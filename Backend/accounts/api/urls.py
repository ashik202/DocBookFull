from django.urls import path
from . import views
from . views import MyTokenObtainPairView,RegisterView,DocRegisterView,userProfileView,DoctorProfileview,counsalting_time,singilcounsaltingtime,adminuserview,admindoctorview,optverification,userconsultingtime,singlepageconsultingtime,doctortbooking,UserViewBooking,DoctorViewBooking,BookingConform,DoctorBookingDetails

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
    path('user/viewbooking/<int:id>',UserViewBooking.as_view(),name='userviewbooking'),
    path('bookingconformation/<int:id>',BookingConform.as_view(),name='userviewbooking'),
    path('user/doctorbooking/',doctortbooking.as_view(),name='doctorbooking'),
    path('doctor/profile/',DoctorProfileview.as_view(),name='doctor_Profile'),
    path('doctor/bookingdetailsview/',DoctorBookingDetails.as_view(),name='doctor_Profile'),
    path('doctor/counsaltingtime/<int:id>',counsalting_time.as_view(),name='doctorCounsaltingtime'),
    path('doctor/counsaltingtime',counsalting_time.as_view(),name='doctorCounsaltingtimepost'),
    path('doctor/singileconsalttime/',singilcounsaltingtime.as_view(),name="doctorsingleconsulting"),
     path('doctor/doctorviewBooking/<int:id>',DoctorViewBooking.as_view(),name="doctorviewbooking"),

    path('Admin/userview/',adminuserview.as_view(),name="adminuserview"),
    path('Admin/doctorview/',admindoctorview.as_view(),name="adminuserview"),
    path('otpverifivation/',optverification.as_view(),name="otpverification"),
    path('user/viewbooking',userconsultingtime.as_view(),name="viewuserconsultingtime"),
    path('user/singledoctorbooking',singlepageconsultingtime.as_view(),name="singlepageconsultingtime"),
    
]
