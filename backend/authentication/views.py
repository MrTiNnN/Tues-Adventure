from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth.hashers import make_password
from .models import User

# Create your views here.

# Registering accoujnts
@api_view(['POST'])
def registration(request):

    # Checking for empty values
    for key, value in request.data.items():
        if value == '' or value == None:
            return Response('Please fill out all of the required fields.', status=400)
        

    # Getting the values from the request
    email = request.data['email']
    firstName = request.data['firstName']
    lastName = request.data['lastName']
    classNumber = request.data['classNumber']
    classLetter = request.data['classLetter']
    password = request.data['password']
    confirmPassword = request.data['confirmPassword']


    # Checking if user already exists
    if User.objects.filter(email=email).exists():
        return Response('A user with this email already exists.', status=400)


    # Checking if passwords match
    if password != confirmPassword:
        return Response("Passwords don't match.", status=400)


    # Hashing the password
    hashed_password = make_password(password)


    # Creating the database object
    try:
        User.objects.create(
            email = email,
            firstName = firstName,
            lastName = lastName,
            grade = classNumber,
            className = classLetter,
            password = hashed_password
        )
    except:
        return Response('Error saving the user.', status=400)


    return Response('User created successfully.', status=201)