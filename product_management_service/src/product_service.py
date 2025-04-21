from flask import Blueprint, request, jsonify
from product_model import create_product, get_all_products
from shared_lib.db import get_mysql
from shared_lib import auth

product_bp = Blueprint('product', __name__)
mysql = get_mysql()

@product_bp.route('/add_products', methods=['POST'])
def add_product():
    data = request.get_json()
    name = data.get('name')
    description = data.get('description')
    price = data.get('price')
    quantity = data.get('quantity')

    if not name or not price:
        return jsonify({'message': 'Missing required fields'}), 400

    product_id = create_product(mysql, name, description, price, quantity)
    return jsonify({'message': 'Product added!', 'product_id': product_id}), 201

@product_bp.route('/products', methods=['GET'])
def list_products():
    products = get_all_products(mysql)
    my_products = []
    for product in products:
        my_products.append({
             "id": product[0], "name": product[1], "description": product[2], "price": product[3], 'quantity': product[4], 'created_at': product[5]
        })
    return jsonify(my_products), 200
