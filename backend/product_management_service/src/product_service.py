from flask import Blueprint, request, jsonify
from product_model import create_product, get_all_products
from shared_lib.db import get_mysql
from shared_lib import auth

product_bp = Blueprint('product', __name__)
mysql = get_mysql()

@product_bp.route('/add_products', methods=['POST'])
def add_product():
    data = request.get_json()
    name = data.get('p_name')
    price = data.get('price')
    stock = data.get('quantity')
    description = data.get('description')

    if not name or not price:
        return jsonify({'message': 'Missing required fields'}), 400

    product_id = create_product(mysql, name, price, stock, description)
    return jsonify({'message': 'Product added!', 'product_id': product_id}), 201

@product_bp.route('/products', methods=['GET'])
def list_products():
    products = get_all_products(mysql)
    my_products = []
    for product in products:
        my_products.append({
             "id": product[0], "p_name": product[1],  "price": product[2], 'stock': product[3],"description": product[4], 'created_at': product[5]
        })
    return jsonify(my_products), 200

@product_bp.route('/products/<int:id>', methods=['PUT'])
def update_product(id):
    data = request.get_json()
    name = data.get('p_name')

    price = data.get('price')
    stock = data.get('stock')
    description = data.get('description')

    cursor = mysql.connection.cursor()
    cursor.execute("""
        UPDATE products 
        SET p_name=%s, price=%s,  stock=%s, description=%s
        WHERE id=%s
    """, (name, price, stock , description, id))
    mysql.connection.commit()
    return jsonify({'message': 'Product updated successfully'}), 200

@product_bp.route('/products/<int:id>', methods=['delete'])
def delete_product(id):
    cursor = mysql.connection.cursor()
    cursor.execute(
      "delete from  products where id = %s",(id,))
    mysql.connection.commit()
    return jsonify({'message': 'product deleted successfully'}), 200