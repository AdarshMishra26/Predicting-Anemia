from django.core.files.base import ContentFile
from django.http import JsonResponse
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.views import APIView
from tensorflow.keras.models import load_model
from rest_framework import status
from rest_framework.response import Response
from django.contrib.auth.models import User
import numpy as np
from PIL import Image
from django.contrib.auth import authenticate
from django.contrib.auth.hashers import make_password

# Load your model
model = load_model('anaemia_detection_model.h5')

# class Status(APIView):
#     def get(self, request, *args, **kwargs):
#          return Response({'message': 'Server is Running successfully'}, status=status.HTTP_200_OK)

class ImagePredictionView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        try:
            # Get the uploaded image
            image = request.FILES['image']

            # Open the image using Pillow
            img = Image.open(image)

            # Resize the image to match the model's input shape
            img = img.resize((128, 128))

            # Convert the image to a numpy array and normalize the pixel values
            img_array = np.array(img) / 255.0

            # Make a prediction using the model
            prediction = model.predict(np.expand_dims(img_array, axis=0))

            # Prepare the response data
            response_data = {
                'prediction': int(np.round(prediction[0][0]))
            }

            return JsonResponse(response_data)

        except Exception as e:
            # If an error occurs, return a 500 Internal Server Error response
            return JsonResponse({'error': str(e)}, status=500)

class SignInView(APIView):
    def post(self, request, *args, **kwargs):
        try:
            # Extracting data from request
            email = request.data.get('email')
            password = request.data.get('password')

            # Authenticating user
            user = authenticate(username=email, password=password)

            if user:
                return Response({'message': 'User signed in successfully'}, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

class SignUpView(APIView):
    def post(self, request, *args, **kwargs):
        try:
            # Extracting data from request
            first_name = request.data.get('firstName')
            last_name = request.data.get('lastName')
            email = request.data.get('email')
            password = request.data.get('password')

            # Hashing the password
            hashed_password = make_password(password)
            
            print(first_name,last_name,email,password,hashed_password)
            # Creating a new user
            user = User.objects.create(
                username=email,
                first_name=first_name,
                last_name=last_name,
                email=email,
                password=hashed_password
            )

            # Saving the user to the database
            user.save()

            return Response({'message': 'User signed up successfully'}, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


