# import json
# from asgiref .sync import async_to_sync

# from channels.generic.websocket import WebsocketConsumer
# from .models import Message
# from accounts.models import Account


# class ChatConsumer(WebsocketConsumer):
#     def fetch_messages(self, data):
#         messages = Message.last_10_messages(self)
#         content = {
#             'command': 'messages',
#             "messages": self.mesasages_to_json(messages)
#         }
#         self.send_chat_message(content)

#     def new_message(self, data):
#         author = data["from"]
#         print(data["message"])
#         author_user = Account.objects.filter(username=author)[0]
#         message = Message.objects.create(
#             author=author_user, content=data['message'])
#         content = {
#             'command': 'new_message',
#             'message': self.mesasage_to_json(message)
#         }
#         return self.send_chat_message(content)

#     def mesasages_to_json(self, messages):
#         result = []
#         for message in messages:
#             result.append(self.mesasage_to_json(message))
#         return result

#     def mesasage_to_json(self, message):
#         return {
#             "author": message.author.username,
#             "content": message.content,
#             "time": str(message.time)
#         }

#     commands = {
#         "fetch_messages": fetch_messages,
#         "new_message": new_message
#     }

#     def connect(self):
#         print("hello")
#         self.room_name = self.scope["url_route"]["kwargs"]["room_name"]
#         self.room_group_name = "chat_%s" % self.room_name

#         # Join room group
#         async_to_sync(self.channel_layer.group_add)(
#             self.room_group_name,
#             self.channel_name
#         )

#         self.accept()

#     def disconnect(self, close_code):
#         # Leave room group
#         async_to_sync(self.channel_layer.group_discard)(
#             self.room_group_name, self.channel_name)

#     # Receive message from WebSocket
#     def receive(self, text_data):
#         data = json.loads(text_data)
#         self.commands[data['command']](self, data)

#     def send_chat_message(self, message):

#         # Send message to room group

#         async_to_sync(self.channel_layer.group_send)(
#             self.room_group_name, {"type": 'chat_message', "message": message}
#         )

#     def send_message(self, message):
#         self.send(text_data=json.dumps(message))

#     # Receive message from room group

#     def chat_message(self, event):
#         message = event["message"]

#         # Send message to WebSocket
#         self.send(text_data=json.dumps(message))




from channels.generic.websocket import JsonWebsocketConsumer
from asgiref .sync import async_to_sync
from .models import Conversation,Message
from unidecode import unidecode
import re
import json
from uuid import UUID
from accounts.models import Account
from chat.serializers import MessageSerializer





@classmethod
def encode_json(cls, content):
    return json.dumps(content, cls=UUIDEncoder)

class UUIDEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, UUID):
            # if the obj is uuid, we simply return the value of uuid
            return obj.hex
        return json.JSONEncoder.default(self, obj)
    
class ChatConsumer(JsonWebsocketConsumer):
    """
    This consumer is used to show user's online status,
    and send notifications.
    """

    def __init__(self, *args, **kwargs):
        super().__init__(args, kwargs)
        self.user = None
        self.conversation_name = None
        self.conversation = None

    def connect(self):
        self.user = self.scope["user"]
        if not self.user.is_authenticated:
            return

        self.accept()
        print(self.scope['url_route'])
        self.conversation_name = self.scope['url_route']['kwargs']['conversation_Name']
        self.conversation, created = Conversation.objects.get_or_create(name=self.conversation_name)
        print(self.conversation_name,"hellommm")
        print(self.channel_name)

        async_to_sync(self.channel_layer.group_add)(
        self.conversation_name,
        self.channel_name)
        messages = self.conversation.messages.all().order_by("-timestamp")[0:50]
        self.send_json({"type": "last_50_messages","messages": MessageSerializer(messages, many=True).data,})
        

    def disconnect(self, code):
        print("Disconnected!")
        return super().disconnect(code)

    def receive_json(self, content, **kwargs):
        message_type = content["type"]
        if message_type == "chat_message":
            message = Message.objects.create(
            from_user=self.user,
            to_user=self.get_receiver(),
            content=content["message"],
            conversation=self.conversation
    )
        
        if message_type == "chat_message":
            async_to_sync(self.channel_layer.group_send)(
            self.conversation_name,
            {
                 "type": "chat_message_echo",
                 "name": self.user.username,
                "message": MessageSerializer(message).data,
   
            },
        )
        return super().receive_json(content, **kwargs)
    
    def chat_message_echo(self, event):
     print(event)
     self.send_json(event)

    def get_receiver(self):
        usernames = self.conversation_name.split("__")
        for username in usernames:
            print(username)
            if username != self.user.username:
            # This is the receiver
                return Account.objects.get(username=username)