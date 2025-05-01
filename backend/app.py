from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np
import os
import json
import cv2
from flask_cors import CORS
import base64

app = Flask(__name__)
CORS(app)  # Enable CORS

# Load model and class labels
MODEL_PATH = "math_symbol_classifier.h5"
CLASS_LABELS_PATH = "class_indices.json"
IMG_SIZE = 45

model = load_model(MODEL_PATH)
with open(CLASS_LABELS_PATH, "r") as f:
    class_labels = json.load(f)
label_map = {v: k for k, v in class_labels.items()}

def preprocess_image(img_path):
    img = image.load_img(img_path, target_size=(IMG_SIZE, IMG_SIZE), color_mode='grayscale')
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    return img_array / 255.0

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    filepath = os.path.join("temp", file.filename)
    os.makedirs("temp", exist_ok=True)
    file.save(filepath)

    try:
        # Predict
        img_array = preprocess_image(filepath)
        prediction = model.predict(img_array)
        predicted_class = int(np.argmax(prediction, axis=1)[0])
        predicted_label = label_map[predicted_class]

        # Read image and overlay prediction
        original_img = cv2.imread(filepath)
        cv2.putText(original_img, f"Predicted: {predicted_label}", (10, 40),
                    cv2.FONT_HERSHEY_SIMPLEX, 1.2, (0, 255, 0), 2)

        # Encode image to base64
        _, buffer = cv2.imencode('.png', original_img)
        img_base64 = base64.b64encode(buffer).decode('utf-8')

        # Clean up
        os.remove(filepath)

        return jsonify({
            'predicted_label': predicted_label,
            'image': img_base64
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
