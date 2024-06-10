from django.db import models
from authentication.models import User

# Create your models here.

class Adventure(models.Model):
    name = models.CharField(max_length=255, null=False)
    description = models.TextField(null=False)
    date = models.DateField(null=False)
    participants = models.ManyToManyField(User, related_name='adventures')