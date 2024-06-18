from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.contrib.auth.hashers import make_password, check_password
from .models import User
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated, AllowAny

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
@permission_classes([AllowAny])
def registration(request):

    # Checking for empty values
    for key, value in request.data.items():
        if value == '' or value == None:
            return Response('Моля попълнете всички полета.', status=400)
        

    # Getting the values from the request
    try:
        email = request.data['email']
        firstName = request.data['firstName']
        lastName = request.data['lastName']
        classNumber = request.data['classNumber']
        classLetter = request.data['classLetter']
        password = request.data['password']
        confirmPassword = request.data['confirmPassword']
        notifications = request.data['notifications']
    except:
        return Response('Моля попълнете всички полета.', status=400)
    

    # Checking if the email is an elsys email
    if not email.endswith('@elsys-bg.org'):
        return Response('Въведете истински elsys имейл.', status=400)


    # Checking if user already exists
    if User.objects.filter(email=email).exists():
        user = User.objects.get(email = email)
        if user.is_active == True:
            return Response('Потребител с този имейл вече съществува.', status=400)
        else:
            user.delete()



    # Checking if passwords match
    if password != confirmPassword:
        return Response("Паролите не съвпадат.", status=400)


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
            password = hashed_password,
            notifications = notifications
        )

        user.save()
    except:
        return Response('Грешка при запазването на акаунта. Опитайте отново.', status=400)
    
    
    try:
        activateAccount(user, email)
    except:
        return Response('Въведете истински elsys имейл.', status=400)



    return Response('Регистрирахте се успешно.', status=201)





# Verifying account
@api_view(['PATCH'])
@permission_classes([AllowAny])
def verification(request):
    try:
        id = force_str(urlsafe_base64_decode(request.data['id']))
        user = User.objects.get(id=id)
    except:
        return Response("Не открихме акаунта, който се опитвате да потвърдите.", status=400)
    
    try:
        token = request.data['token']
        if account_activation_token.check_token(user, token):
            user.is_active = True
            user.save()
        else:
            return Response('Времето Ви за потвърждение е изтекло.', status=400)
    except:
        return Response("Couldn't verify user.", status=400)


    return Response('Потвърждение успешно!.', status=200)





# Logging in to an account
@api_view(['POST'])
@permission_classes([AllowAny])
def authentication(request):

    # Checking for empty values
    for key, value in request.data.items():
        if value == '' or value == None:
            return Response(f'Полето {key} е задължително.', status=400)
        

    # Getting the values from the request
    try:
        email = request.data['email']
        password = request.data['password']
    except:
        return Response('Моля попълнете всички полета.', status=400)


    # Checking if the user exists
    try:
        user = User.objects.get(email=email)
        if user.is_active == False:
            raise Exception()

        # Checking if the password is correct
        if check_password(password, user.password):
            token = RefreshToken.for_user(user)

            return Response({
                'data': 'Успешно влизане.',
                'refresh': str(token),
                'access': str(token.access_token)
            }, status=200)
        else:
            return Response('Грешна парола.', status=400)

    except:
        return Response('Не съществува акаунт с този имейл.', status=404)
    

# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def fake_view(request):
#     # authentication_classes = [IsAuthenticated]
#     method = request.method
#     url = request.build_absolute_uri()
#     headers = dict(request.headers)
#     body = request.body.decode('utf-8') if request.body else None
    
#     # Prepare a dictionary with request information
#     request_info = {
#         'method': method,
#         'url': url,
#         'headers': headers,
#         'body': body,
#     }
    
#     # Print or log the request information (optional)
#     print(f"Request Format: {request_info}")
    
#     # Return the request information in the response
#     return Response(request_info, status=200)