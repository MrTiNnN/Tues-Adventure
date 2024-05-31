from django.db import models

# Create your models here.

class User(models.Model):
    email = models.EmailField(max_length=200, null=False, unique=True)
    firstName = models.CharField(max_length=200, null=False)
    lastName = models.CharField(max_length=200, null=False)
    grade = models.IntegerField(null=False)
    className = models.CharField(max_length=1, null=False)
    password = models.CharField(max_length=200, unique=True)
