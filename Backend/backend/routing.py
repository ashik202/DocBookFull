# from channels.auth import AuthMiddlewareStack
# from channels.routing import ProtocolTypeRouter, URLRouter
# import chat.routing

# application = ProtocolTypeRouter({
#     # (http->django views is added by default)
#     'websocket': AuthMiddlewareStack(
#         URLRouter(
#             chat.routing.websocket_urlpatterns
#         )
#     ),
# })

from django.urls import path

from chat.consumers import ChatConsumer

websocket_urlpatterns = [path("<conversation_Name>/", ChatConsumer.as_asgi())]