from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
import tensorflow_hub as hub
import numpy as np
import cv2

app = Flask(__name__)
CORS(app)

# Charger le modèle I3D pré-entraîné depuis TensorFlow Hub
model_i3d = hub.load("https://tfhub.dev/deepmind/i3d-kinetics-400/1").signatures['default']

def load_video(file_path, max_frames=64, resize=(224, 224)):
    cap = cv2.VideoCapture(file_path)
    frames = []
    while len(frames) < max_frames:
        ret, frame = cap.read()
        if not ret:
            break
        frame = cv2.resize(frame, resize)
        frame = frame[:, :, [2, 1, 0]]  # Convertir BGR en RGB
        frames.append(frame)
    cap.release()
    return np.array(frames)

def predict_action(frames):
    frames = tf.convert_to_tensor(frames, dtype=tf.float32)
    frames = tf.expand_dims(frames, axis=0) / 255.0
    logits = model_i3d(frames)['default']
    probabilities = tf.nn.softmax(logits)
    return probabilities

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'})

    file_path = f"/tmp/{file.filename}"
    file.save(file_path)

    frames = load_video(file_path)
    probabilities = predict_action(frames)

    top_5_indices = tf.argsort(probabilities, axis=-1, direction='DESCENDING')[0][:5].numpy()
    top_5_probs = tf.gather(probabilities[0], top_5_indices).numpy()

    actions = [{"action": int(idx), "probability": float(prob)} for idx, prob in zip(top_5_indices, top_5_probs)]
    return jsonify({'actions': actions})

if __name__ == '__main__':
    app.run(debug=True)
