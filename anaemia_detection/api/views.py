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
from django.contrib.auth import get_user_model
from .models import Prediction, ContactMessage
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token# Load your model
model = load_model('anaemia_detection_model.h5')
import jwt
from rest_framework import serializers
from datetime import datetime

class ImagePredictionView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        try:
            # Get the uploaded image
            image = request.FILES.get('image')

            if not image:
                return JsonResponse({'error': 'No image file found'}, status=400)

            # Open the image using Pillow
            img = Image.open(image)

            # Convert the image to RGB if it is not
            if img.mode != 'RGB':
                img = img.convert('RGB')

            # Resize the image to match the model's input shape
            img = img.resize((128, 128))

            # Convert the image to a numpy array and normalize the pixel values
            img_array = np.array(img) / 255.0

            # Ensure that the input has the correct shape (batch_size, height, width, channels)
            img_array = np.expand_dims(img_array, axis=0)

            # Make a prediction using the model
            prediction = model.predict(img_array)

            # Extract user information from the JWT token
            token = request.headers.get('Authorization').split(' ')[1]
            decoded_token = jwt.decode(token, "secret", algorithms=["HS256"])
            email = decoded_token["email"]
            user = get_user_model().objects.get(email=email)

            # Save the prediction to the database with the associated user
            Prediction.objects.create(user=user, result=int(np.round(prediction[0][0])))

            # Prepare the response data
            response_data = {
                'prediction': int(np.round(prediction[0][0]))
            }

            return JsonResponse(response_data)

        except Exception as e:
            # Log the error
            print("Error:", e)

            # If an error occurs, return a 500 Internal Server Error response
            return JsonResponse({'error': 'Internal Server Error'}, status=500)

class PredictionHistoryView(APIView):
    def get(self, request, *args, **kwargs):
        try:
            # Extract email from JWT token
            token = request.headers.get('Authorization').split(' ')[1]
            decoded_token = jwt.decode(token, "secret", algorithms=["HS256"])
            email = decoded_token["email"]
            
            # Get user based on email
            user = get_user_model().objects.get(email=email)
            
            # Fetch predictions associated with the user
            predictions = Prediction.objects.filter(user=user)
            
            # Serialize the predictions
            class PredictionSerializer(serializers.ModelSerializer):
                timestamp = serializers.SerializerMethodField()

                def get_timestamp(self, obj):
                    return obj.timestamp.strftime("%Y-%m-%d %H:%M:%S")

                class Meta:
                    model = Prediction
                    fields = ['id', 'timestamp', 'result']
            
            serializer = PredictionSerializer(predictions, many=True)
            
            return Response(serializer.data)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)



class SignInView(APIView):
    def post(self, request, *args, **kwargs):
        try:
            # Extracting data from request
            email = request.data.get('email')
            password = request.data.get('password')

            encoded = jwt.encode({"email":email}, "secret", algorithm="HS256")

            # Authenticating user
            user = authenticate(username=email, password=password)

            if user:
                return Response({'message': 'User signed in successfully','token':encoded}, status=status.HTTP_200_OK)
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


class UserProfileView(APIView):
    def get(self, request, *args, **kwargs):
        try:
            print("Headers:", request.headers)  # Add this line to check the headers
            token =  jwt.decode(request.headers['Authorization'].split(' ')[1], "secret", algorithms=["HS256"])
            
            # Get the currently authenticated user
            profile = User.objects.filter(email=token["email"]).values()

            return Response({"response_data":profile}, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)



    # def put(self, request, *args, **kwargs):
        try:
            # Get the currently authenticated user
            user = request.user

            # Extracting data from request
            first_name = request.data.get('firstName')
            last_name = request.data.get('lastName')
            email = request.data.get('email')
            # mobile_number = request.data.get('mobileNumber')

            # Update the user's data
            user.first_name = first_name
            user.last_name = last_name
            user.email = email

            # Save the user to the database
            user.save()

            # Get or create the user's profile
            profile, created = get_user_model().profile_model.objects.get_or_create(user=user)

            # Update the user's profile data
            # profile.mobile_number = mobile_number

            # Save the user's profile to the database
            profile.save()

            return Response({'message': 'User profile updated successfully'}, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

class ContactUsView(APIView):
    def post(self, request, *args, **kwargs):
        try:
            # Extracting data from request
            name = request.data.get('name')
            email = request.data.get('email')
            message = request.data.get('message')

            # Save the contact message to the database
            ContactMessage.objects.create(name=name, email=email, message=message)

            return Response({'message': 'Message sent successfully'}, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)