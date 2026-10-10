# app.py
import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from shared_lib.db import init_mysql
from shared_lib.logger import get_logger
from stock_service import add_or_update_stock, fetch_all_stocks, fetch_stock_by_product

app = Flask(__name__)
CORS(app)

# Initialize MySQL (reads DB_HOST, DB_USER, DB_PASSWORD, DB_NAME from env)
init_mysql(app)
logger = get_logger("stock_service")


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

@app.route("/")
def index():
    return "Stock Management Service is running"

if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=os.getenv('FLASK_DEBUG', '0') == '1', port=5003)
