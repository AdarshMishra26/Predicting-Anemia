import os
import numpy as np
import pandas as pd
import tensorflow as tf
from sklearn.metrics import classification_report
import matplotlib.pyplot as plt
import plotly.express as px
from sklearn.model_selection import train_test_split
import sys
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Conv2D, Flatten, MaxPooling2D
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.layers import Dropout


# Define the base directory where the images are stored
base_directory = 'kaggle'

# Initialize dictionaries
df_image = {'Anaemia':[],'Normal':[]}
df_labels = {'Anaemia':1,'Normal':0}

# Iterate through the image paths
for image_path in os.listdir(base_directory):
    # Check if the path corresponds to an image file
    if image_path.endswith('.jpg'):
        # Extract information from the file name
        _, label, _ = image_path.split('_')

        # Append the image path to the corresponding label in df_image
        if label=='1':
            label='Anaemia'
        elif label=='2':
            label='Normal'
        df_image[label].append(os.path.join(base_directory, image_path))

# Visualize the distribution of the data
labels = list(df_image.keys())
counts = [len(df_image[key]) for key in labels]

plt.bar(labels, counts, color=['orange', 'blue'])
plt.xlabel('Label')
plt.ylabel('Count')
plt.title('Distribution of Labels in df_image')
plt.show()

# Visualize some sample images
fig,ax=plt.subplots(ncols=2, figsize=(15,5))
fig.suptitle('Normal Patients & Patients with Anaemia ')
Anaemia=plt.imread(df_image['Anaemia'][25])
Normal=plt.imread(df_image['Normal'][40])

ax[0].set_title('Anaemia')
ax[1].set_title('Normal')

ax[0].imshow(Anaemia)
ax[1].imshow(Normal)

# Prepare the data
X,y=[],[]

for label, images in df_image.items():
    for image in images:
        img=plt.imread(str(image))
        resized_img=tf.image.resize(img, [128,128])
        X.append(resized_img)
        y.append(df_labels[label])

# Convert the data to numpy arrays
X=np.array(X)
y=np.array(y)

# Normalize the pixel values
X=X/255

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Define the data augmentation parameters
datagen = ImageDataGenerator(
    rotation_range=40,
    width_shift_range=0.2,
    height_shift_range=0.2,
    shear_range=0.2,
    zoom_range=0.2,
    horizontal_flip=True,
    fill_mode='nearest'
)

# Define the model architecture
model = Sequential([
    Conv2D(32, (3, 3), activation='relu', input_shape=(128, 128, 3)),
    MaxPooling2D((2, 2)),
    Conv2D(64, (3, 3), activation='relu'),
    MaxPooling2D((2, 2)),
    Conv2D(128, (3, 3), activation='relu'),
    MaxPooling2D((2, 2)),
    Flatten(),
    Dense(512, activation='relu'),
    Dropout(0.5),
    Dense(1, activation='sigmoid')
])

# Compile the model
model.compile(optimizer='adam',
              loss='binary_crossentropy',
              metrics=['accuracy'])

# Train the model using data augmentation
history = model.fit(datagen.flow(X_train, y_train, batch_size=32),
                    epochs=15,
                    validation_data=(X_test, y_test),
                    verbose=1)

# Evaluate the model on the test set
y_pred = model.predict(X_test)
y_pred_bool = np.round(y_pred).astype(int)

# Print the classification report
print(classification_report(y_test, y_pred_bool))

# Plot the training and validation accuracy
acc = history.history['accuracy']
val_acc = history.history['val_accuracy']
epochs_range = range(len(acc))

plt.figure(figsize=(8, 8))
plt.subplot(1, 2, 1)
plt.plot(epochs_range, acc, label='Training Accuracy')
plt.plot(epochs_range, val_acc, label='Validation Accuracy')
plt.legend(loc='lower right')
plt.title('Training and Validation Accuracy')

# Plot the training and validation loss
loss = history.history['loss']
val_loss = history.history['val_loss']

plt.subplot(1, 2, 2)
plt.plot(epochs_range, loss, label='Training Loss')
plt.plot(epochs_range, val_loss, label='Validation Loss')
plt.legend(loc='upper right')
plt.title('Training and Validation Loss')
plt.show()

# Save the entire model (architecture, optimizer, and learned parameters)
model.save('anaemia_detection_model.h5')
