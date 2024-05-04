from django.core.files.base import ContentFile
from django.http import JsonResponse
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.views import APIView
from tensorflow.keras.models import load_model

import numpy as np
from PIL import Image

# Load your model
model = load_model('anaemia_detection_model.h5')

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
