from django.db import models
from accounts.models import Account,Docprofile

# Create your models here.
# class Message(models.Model):
#     author=models.ForeignKey(Account,related_name='auther',on_delete=models.CASCADE)
#     content=models.TextField(max_length=200)
#     time=models.DateTimeField(auto_now_add=True)
#     def __str__(self):
#         return self.author.username
#     def last_10_messages(self):
#         return Message.objects.order_by('-time').all()[:10]
        
    
import uuid

from django.contrib.auth import get_user_model
from django.db import models

from accounts.models import Account


class Conversation(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=128)
    online = models.ManyToManyField(to=Account, blank=True)

    def get_online_count(self):
        return self.online.count()

    def join(self, user):
        self.online.add(user)
        self.save()

    def leave(self, user):
        self.online.remove(user)
        self.save()

    def __str__(self):
        return f"{self.name} ({self.get_online_count()})"


class Message(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    conversation = models.ForeignKey(
        Conversation, on_delete=models.CASCADE, related_name="messages"
    )
    from_user = models.ForeignKey(
        Account, on_delete=models.CASCADE, related_name="messages_from_me"
    )
    to_user = models.ForeignKey(
        Account, on_delete=models.CASCADE, related_name="messages_to_me"
    )
    content = models.CharField(max_length=512)
    timestamp = models.DateTimeField(auto_now_add=True)
    read = models.BooleanField(default=False)

    def __str__(self):
        return f"From {self.from_user.username} to {self.to_user.username}: {self.content} [{self.timestamp}]"  