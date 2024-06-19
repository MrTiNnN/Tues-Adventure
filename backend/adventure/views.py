from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import AccessToken
from datetime import datetime

from authentication.models import User
from .models import Adventure


def decode(request):
    # Getting the header
    header = request.headers.get('Authorization')
    if not header:
        raise ValueError
    

    # Getting the token string
    tokenString = header.split(' ')[1]
    if not tokenString:
        raise ValueError
    

    # Decoding the token
    try:
        token = AccessToken(tokenString)

        return token
    except:
        raise ValueError


# Create your views here.
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def creation(request):
    # Getting the authorization token
    try:
        token = decode(request)
    except:
        return Response("No valid authorization token provided.", status=401)
    
    id = token['user_id']

    # Checking if the user is an admin
    try:
        user = User.objects.get(id=id)

        if user.role != '2':
            return Response("You don't have permission to do this.", status=403)
        

        else:
            # Getting the data from the request
            try:
                name = request.data['name']
                description = request.data['description']
                date = request.data['date']

                formattedDate = datetime.strptime(date, '%d-%m-%Y').date()
            except:
                return Response("Please fill out all of the required fields.", status=401)
            

            try:
                adventure = Adventure(
                    name = name,
                    description = description,
                    date = formattedDate
                )

                adventure.save()
            except:
                return Response("Error saving the adventure.", status=400)


    except:
        return Response("Couldn't find the user you're trying to authorize.", status=401)


    return Response('Adventure created successfully.', status=201)