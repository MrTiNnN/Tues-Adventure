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




@api_view(['GET'])
@permission_classes([IsAuthenticated])
def adventure(request):
    # Getting the id
    id = request.GET.get('id', None)
    if id == None:
        return Response('Provide an id for the desired resource.', status=401)
    

    # Getting the adventure
    try:
        adventure = Adventure.objects.get(id=id)

        name = adventure.name
        description = adventure.description
        date = adventure.date

        participantObjects = adventure.participants.all()
        participants = []
        for participant in participantObjects:
            participants.append({
                'email': participant.email,
                'firstName': participant.firstName,
                'lastName': participant.lastName,
                'grade': f'{participant.grade}{participant.className}',
            })

    except:
        return Response("Couldn't find the adventure you're looking for.", status=401)

    
    return Response({
        'name': name,
        'description': description,
        'date': date,
        'participants': participants
    }, status=200)



@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def signingUp(request):
    # Getting the token
    try:
        token = decode(request)
    except:
        return Response("No valid authorization token provided.", status=401)
    
    id = token['user_id']


    # Getting the adventure id from the query parameters
    adventureId = request.GET.get('id', None)
    if adventureId == None:
        return Response('Provide an id for the desired resource.', status=401)
    

    # Getting the adventure object
    try:
        adventure = Adventure.objects.get(id=adventureId)
    except:
        return Response("Couldn't find the adventure you're looking for.", status=401)


    # Getting the user object
    try:
        user = User.objects.get(id=id)
    except:
        return Response("Couldn't find the user you're trying to sign up.", status=401)
    

    # Checking if the user is already a participant
    if adventure.participants.filter(id=id).exists():
        return Response("User is already a participant.", status=401)
    

    # Adding the user as a participant
    try:
        adventure.participants.add(user)

        adventure.save()
    except:
        return Response("Error saving the changes.", status=400)

    return Response("Participant added successfully.", status=200)



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def allAdventures(request):
    # Getting the adventures
    try:
        adventureObjects = Adventure.objects.all()
        adventures = []
        for adventure in adventureObjects:
            adventures.append({
                'id': adventure.id,
                'name': adventure.name,
                'description': adventure.description,
                'date': adventure.date
            })
    except:
        return Response("Couldn't get the adventures from the database.", status=404)

    return Response({
        'adventures': adventures
    }, status=200)