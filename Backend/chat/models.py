from django.db import models
from accounts.models import Account,Docprofile

# Create your models here.
class Message(models.Model):
    author=models.ForeignKey(Account,related_name='auther',on_delete=models.CASCADE)
    content=models.TextField(max_length=200)
    time=models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.author.username
    def last_10_messages(self):
        return Message.objects.order_by('-time').all()[:10]
        
    
    