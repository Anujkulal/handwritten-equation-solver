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












# from flask import Flask, request, send_file, jsonify
# from tensorflow.keras.models import load_model
# from tensorflow.keras.preprocessing import image
# import numpy as np
# import os
# import json
# import cv2
# from flask_cors import CORS
# from io import BytesIO

# app = Flask(__name__)
# CORS(app)  # Allow CORS from any origin

# # Load model and label map once
# MODEL_PATH = "math_symbol_classifier.h5"
# CLASS_LABELS_PATH = "class_indices.json"
# IMG_SIZE = 45

# model = load_model(MODEL_PATH)
# with open(CLASS_LABELS_PATH, "r") as f:
#     class_labels = json.load(f)
# label_map = {v: k for k, v in class_labels.items()}

# def preprocess_image(img_path):
#     img = image.load_img(img_path, target_size=(IMG_SIZE, IMG_SIZE), color_mode='grayscale')
#     img_array = image.img_to_array(img)
#     img_array = np.expand_dims(img_array, axis=0)
#     return img_array / 255.0

# @app.route('/predict', methods=['POST'])
# def predict():
#     if 'file' not in request.files:
#         return jsonify({'error': 'No file part'}), 400

#     file = request.files['file']
#     if file.filename == '':
#         return jsonify({'error': 'No selected file'}), 400

#     filepath = os.path.join("temp", file.filename)
#     os.makedirs("temp", exist_ok=True)
#     file.save(filepath)

#     try:
#         # Predict symbol
#         img_array = preprocess_image(filepath)
#         prediction = model.predict(img_array)
#         predicted_class = int(np.argmax(prediction, axis=1)[0])
#         predicted_label = label_map[predicted_class]

#         # Overlay label on image
#         original_img = cv2.imread(filepath)
#         cv2.putText(original_img, f"Predicted: {predicted_label}", (10, 40),
#                     cv2.FONT_HERSHEY_SIMPLEX, 1.2, (0, 255, 0), 2)

#         # Convert image to in-memory buffer
#         _, buffer = cv2.imencode('.png', original_img)
#         img_io = BytesIO(buffer)

#         # Clean up
#         os.remove(filepath)

#         return send_file(img_io, mimetype='image/png')

#     except Exception as e:
#         return jsonify({'error': str(e)}), 500

# if __name__ == '__main__':
#     app.run(debug=True)










# from flask import Flask, request, jsonify
# from tensorflow.keras.models import load_model
# from tensorflow.keras.preprocessing import image
# import numpy as np
# import os
# import json
# import cv2
# from flask_cors import CORS


# app = Flask(__name__)
# CORS(app) 
# # Load model and label map once
# MODEL_PATH = "math_symbol_classifier.h5"
# CLASS_LABELS_PATH = "class_indices.json"
# IMG_SIZE = 45

# model = load_model(MODEL_PATH)
# with open(CLASS_LABELS_PATH, "r") as f:
#     class_labels = json.load(f)
# label_map = {v: k for k, v in class_labels.items()}

# def preprocess_image(img_path):
#     img = image.load_img(img_path, target_size=(IMG_SIZE, IMG_SIZE), color_mode='grayscale')
#     img_array = image.img_to_array(img)
#     img_array = np.expand_dims(img_array, axis=0)
#     return img_array / 255.0

# @app.route('/predict', methods=['POST'])
# def predict():
#     if 'file' not in request.files:
#         return jsonify({'error': 'No file part'}), 400

#     file = request.files['file']
#     if file.filename == '':
#         return jsonify({'error': 'No selected file'}), 400

#     filepath = os.path.join("temp", file.filename)
#     os.makedirs("temp", exist_ok=True)
#     file.save(filepath)

#     try:
#         img_array = preprocess_image(filepath)
#         prediction = model.predict(img_array)
#         predicted_class = int(np.argmax(prediction, axis=1)[0])
#         predicted_label = label_map[predicted_class]
#         os.remove(filepath)
#         return jsonify({'predicted_symbol': predicted_label})
#     except Exception as e:
#         return jsonify({'error': str(e)}), 500

# if __name__ == '__main__':
#     app.run(debug=True)








# # from flask import Flask, jsonify
# # from flask_cors import CORS

# # app = Flask(__name__)
# # CORS(app)

# # @app.route('/api/message')
# # def get_message():
# #     return jsonify({"message": "Hello from Flask!"})

# # if __name__ == '__main__':
# #     app.run(debug=True, port=5000)



# import numpy as np
# from tensorflow.keras.preprocessing import image
# from tensorflow.keras.models import load_model
# import cv2
# import matplotlib.pyplot as plt
# import os
# import json

# # ====== SETTINGS ======
# MODEL_PATH = "math_symbol_classifier.h5"
# CLASS_LABELS_PATH = "class_indices.json"  # Save this once during training
# IMG_SIZE = 45


# # ====== Load the model ======
# model = load_model(MODEL_PATH)


# # ====== Load class label map ======
# with open(CLASS_LABELS_PATH, "r") as f:
#     class_labels = json.load(f)
# label_map = {v: k for k, v in class_labels.items()}


# # ====== Preprocess function ======
# def preprocess_image(img_path, img_size=IMG_SIZE):
#     img = image.load_img(img_path, target_size=(img_size, img_size), color_mode='grayscale')
#     img_array = image.img_to_array(img)
#     img_array = np.expand_dims(img_array, axis=0)
#     img_array = img_array / 255.0
#     return img_array


# # ====== Main prediction ======
# img_path = input("Enter the path of the image file: ")

# if not os.path.exists(img_path):
#     raise FileNotFoundError(f"File not found: {img_path}")

# img_array = preprocess_image(img_path)
# prediction = model.predict(img_array)
# predicted_class = np.argmax(prediction, axis=1)[0]
# predicted_label = label_map[predicted_class]

# print(f"Predicted symbol: {predicted_label}")

# # ====== Display the image (or save it) ======
# img = cv2.imread(img_path, cv2.IMREAD_GRAYSCALE)
# plt.imshow(img, cmap='gray')
# plt.title(f"Predicted: {predicted_label}")
# plt.axis('off')
# plt.savefig("prediction_result.png")
# print("Prediction result saved as 'prediction_result.png'")
