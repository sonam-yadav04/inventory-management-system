import os
from dotenv import load_dotenv
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_socketio import SocketIO

load_dotenv()

app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*", async_mode="threading")


@app.route("/")
def index():
    return "Events Management Service is running"


@app.route("/events", methods=["POST"])
def publish_event():
    """Other services POST an event here; it is pushed to every connected browser."""
    event = request.get_json()
    if not event or "type" not in event:
        return jsonify({"message": "Event 'type' is required"}), 400
    socketio.emit("inventory_event", event)
    return jsonify({"message": "Event broadcast"}), 202


@socketio.on("connect")
def on_connect():
    print("Client connected")


if __name__ == "__main__":
    socketio.run(
        app,
        host="0.0.0.0",
        port=5005,
        debug=os.getenv("FLASK_DEBUG", "0") == "1",
        allow_unsafe_werkzeug=True,
    )