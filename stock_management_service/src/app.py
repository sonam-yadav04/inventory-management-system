# app.py

from flask import Flask, request, jsonify
from flask_cors import CORS
from shared_lib.db import init_mysql
from shared_lib.logger import get_logger
from  stock_management_service.src .stock_service import *

app = Flask(__name__)
CORS(app)

# Initialize MySQL and Logger
init_mysql(app)
logger = get_logger("stock_service")
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'Sonam123'
app.config['MYSQL_DB'] = 'inventory_db'


@app.route("/stock", methods=["POST"])
def add_stock_route():
    data = request.get_json()
    logger.info("Adding or updating stock")

    response_data, status_code = add_or_update_stock(data)
    return jsonify(response_data), status_code


@app.route("/stock", methods=["GET"])
def get_all_stock_route():
    logger.info("Fetching all stock")
    return jsonify(*fetch_all_stocks())

@app.route("/stock/<int:product_id>", methods=["GET"])
def get_stock_by_product_route(product_id):
    logger.info(f"Fetching stock for product_id {product_id}")
    return jsonify(*fetch_stock_by_product(product_id))
#print(jsonify(*fetch_stock_by_product(product_id)))

@app.route("/")
def index():
    return "Stock Management Service is running"

if __name__ == "__main__":
    app.run(debug=True, port=5003)
