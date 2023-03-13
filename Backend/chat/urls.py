from django.urls import path,re_path
from .views import index
from . import views
urlpatterns = [
    path('',index,name='index'),
    path("<str:room_name>/", views.room, name="room")
    
]