from django.urls import re_path

from . import consumers

from django.urls import path

from chat.consumers import ChatConsumer

websocket_urlpatterns = [path("<conversation_Name>/", ChatConsumer.as_asgi())]