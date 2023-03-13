import json
from asgiref .sync import async_to_sync

from channels.generic.websocket import WebsocketConsumer
from .models import Message
from accounts.models import Account


class ChatConsumer(WebsocketConsumer):
    def fetch_messages(self, data):
        messages = Message.last_10_messages(self)
        content = {
            'command': 'messages',
            "messages": self.mesasages_to_json(messages)
        }
        self.send_chat_message(content)

    def new_message(self, data):
        author = data["from"]
        print(data["message"])
        author_user = Account.objects.filter(username=author)[0]
        message = Message.objects.create(
            author=author_user, content=data['message'])
        content = {
            'command': 'new_message',
            'message': self.mesasage_to_json(message)
        }
        return self.send_chat_message(content)

    def mesasages_to_json(self, messages):
        result = []
        for message in messages:
            result.append(self.mesasage_to_json(message))
        return result

    def mesasage_to_json(self, message):
        return {
            "author": message.author.username,
            "content": message.content,
            "time": str(message.time)
        }

    commands = {
        "fetch_messages": fetch_messages,
        "new_message": new_message
    }

    def connect(self):
        print("hello")
        self.room_name = self.scope["url_route"]["kwargs"]["room_name"]
        self.room_group_name = "chat_%s" % self.room_name

        # Join room group
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )

        self.accept()

    def disconnect(self, close_code):
        # Leave room group
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name, self.channel_name)

    # Receive message from WebSocket
    def receive(self, text_data):
        data = json.loads(text_data)
        self.commands[data['command']](self, data)

    def send_chat_message(self, message):

        # Send message to room group

        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name, {"type": 'chat_message', "message": message}
        )

    def send_message(self, message):
        self.send(text_data=json.dumps(message))

    # Receive message from room group

    def chat_message(self, event):
        message = event["message"]

        # Send message to WebSocket
        self.send(text_data=json.dumps(message))