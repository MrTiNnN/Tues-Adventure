from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth.hashers import make_password, check_password
from .models import User

from .tokens import account_activation_token
from django.core.mail import EmailMessage
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str

# Create your views here.

# Sending a confirmation email
def activateAccount(user, to_email):
    mail_subject = "TUES Adventure Verification"
    message = f'Please activate your account: http://localhost:5173/activate/{urlsafe_base64_encode(force_bytes(user.pk))}/{account_activation_token.make_token(user)}'
    email = EmailMessage(mail_subject, message, to=[to_email])

    email.send()


# Registering accounts
@api_view(['POST'])
def registration(request):

    # Checking for empty values
    for key, value in request.data.items():
        if value == '' or value == None:
            return Response('Please fill out all of the required fields.', status=400)
        

    # Getting the values from the request
    try:
        email = request.data['email']
        firstName = request.data['firstName']
        lastName = request.data['lastName']
        classNumber = request.data['classNumber']
        classLetter = request.data['classLetter']
        password = request.data['password']
        confirmPassword = request.data['confirmPassword']
    except:
        return Response('Please fill out all of the required fields.', status=400)
    

    # Checking if the email is an elsys email
    if not email.endswith('@elsys-bg.org'):
        return Response('Please enter a valid elsys email address.', status=400)


    # Checking if user already exists
    if User.objects.filter(email=email).exists():
        user = User.objects.get(email = email)
        if user.is_active == True:
            return Response('A user with this email already exists.', status=400)
        else:
            user.delete()



    # Checking if passwords match
    if password != confirmPassword:
        return Response("Passwords don't match.", status=400)


    # Hashing the password
    hashed_password = make_password(password)


    # Creating the database object
    try:
        user = User(
            email = email,
            firstName = firstName,
            lastName = lastName,
            grade = classNumber,
            className = classLetter,
            password = hashed_password
        )

        user.save()
    except:
        return Response('Error saving the user.', status=400)
    
    
    try:
        activateAccount(user, email)
    except:
        return Response('Please enter a valid elsys email address.', status=400)



    return Response('User created successfully.', status=201)





# Verifying account
@api_view(['PATCH'])
def verification(request):
    try:
        id = force_str(urlsafe_base64_decode(request.data['id']))
        user = User.objects.get(id=id)
    except:
        return Response("Couldn't find the user you're trying to verify.", status=400)
    
    try:
        token = request.data['token']
        if account_activation_token.check_token(user, token):
            user.is_active = True
            user.save()
        else:
            return Response('Please enter a valid token.', status=400)
    except:
        return Response("Couldn't verify user.", status=400)


    return Response('Verification successfull! Now you can login to your account.', status=200)





# Logging in to an account
@api_view(['POST'])
def authentication(request):

    # Checking for empty values
    for key, value in request.data.items():
        if value == '' or value == None:
            return Response(f'The {key} field is required.', status=400)
        

    # Getting the values from the request
    try:
        email = request.data['email']
        password = request.data['password']
    except:
        return Response('Please fill out all of the required fields.', status=400)


    # Checking if the user exists
    try:
        user = User.objects.get(email=email)

        # Checking if the password is correct
        if check_password(password, user.password):
            return Response({'data': 'Login successfull.', 'user': {'id': user.id}}, status=200)
        else:
            return Response('Wrong password.', status=400)

    except:
        return Response('There is not a user with this email.', status=404)