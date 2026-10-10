# --- app.py ---
from flask import Flask, request, jsonify
from flask_cors import CORS
from shared_lib.logger import get_logger
from shared_lib.db import init_mysql
from order_service import place_order, fetch_orders, fetch_order

app = Flask(__name__)
CORS(app)

# Initialize MySQL and Logger
init_mysql(app)
logger = get_logger("order_service")
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'Sonam123'
app.config['MYSQL_DB'] = 'inventory_db'

@app.route("/orders", methods=["POST"])
def create_order():
    data = request.get_json()
    logger.info("Creating order")
    return jsonify({"message": "Order placed successfully"}), 201

@app.route("/orders", methods=["GET"])
def get_orders():
    return jsonify(*fetch_orders())

@app.route("/orders/<int:order_id>", methods=["GET"])
def get_order(order_id):
    return jsonify(*fetch_order(order_id))

@app.route("/")
def index():
    return "Order Management Service is running"

if __name__ == "__main__":
    app.run(debug=True, port=5004)
