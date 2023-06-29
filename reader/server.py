from flask import Flask, send_file, jsonify

app = Flask(__name__)

@app.route('/')
def home():
    message = {
        "text": "Server up",
    }

    return jsonify(message)

@app.route("/qr_code")
def serve_qr_code():
    qr_image_path = './qr_code_image/sensor_data_qr.png'

    return send_file(qr_image_path, mimetype="image/png")

if __name__ == "__main__":
    app.run()