import eventlet
import socketio
import Adafruit_DHT
from datetime import datetime 
import time
from bson import ObjectId
import qrcode

from db_connection import connect_to_database
from assign_qr_to_product import assign_qr_to_product

from env_vars import MONGO_CONNECTION_STRING, DATABASE_NAME, COLLECTION_NAME

# initialize socketio

sio = socketio.Server(cors_allowed_origins="*")
app = socketio.WSGIApp(sio)

# Database connection

conn = connect_to_database(MONGO_CONNECTION_STRING, DATABASE_NAME, COLLECTION_NAME)

@sio.on('connect')
def connect(sid, environ):
    print('Client connected', sid)

@sio.on('disconnect')
def disconnect(sid):
    print('Client disconnect', sid)

@sio.on('start_sensor')
def start_sensor(sid):
    while True:
        humidity, temperature = Adafruit_DHT.read_retry(11, 4)

        sensorData = {
            "temperature": temperature,
            "humidity": humidity,
            "dateCreated": datetime.now().isoformat()
        }

        result = conn.insert_one(sensorData)
        
        sensorData["_id"] = str(result.inserted_id)
        
        sio.emit('sensor_data', 'Active')

        qr = qrcode.QRCode()
        qr.add_data(sensorData)
        qr.make(fit=True)
        qr_image = qr.make_image(fill="black", back_color="white")
        qr_image.save("./qr_code_image/sensor_data_qr.png")

        assign_qr_to_product("BAT1", "http://localhost:5000/qr_code")

        time.sleep(5)

if __name__ == '__main__':
    eventlet.wsgi.server(eventlet.listen(('', 5001)), app)