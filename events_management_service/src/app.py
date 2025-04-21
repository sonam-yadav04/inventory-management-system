import os
import pymysql

from flask import *


DB_CONFIG = {
    "host": os.getenv("DB_HOST", "localhost"),
    "user": os.getenv("DB_USER", "root"),
    "password": os.getenv("DB_PASSWORD", "Sonam123"),
    "database": os.getenv("DB_NAME", "inventorydb"),
}

def get_connection():
    return pymysql.connect(
        host=DB_CONFIG["host"],
        user=DB_CONFIG["user"],
        password=DB_CONFIG["password"],
        database=DB_CONFIG["database"],
        cursorclass=pymysql.cursors.DictCursor
    )

def initialize_database():
    conn = get_connection()
    with conn.cursor() as cursor:
        cursor.execute("CREATE DATABASE IF NOT EXISTS inventory_db")
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS products (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                price DECIMAL(10,2) NOT NULL,
                stock INT NOT NULL
            )
        """)
    conn.commit()
    conn.close()

class Product:
    @staticmethod
    def get_all():
        conn = get_connection()
        with conn.cursor() as cursor:
            cursor.execute("SELECT * FROM products")
            products = cursor.fetchall()
        conn.close()
        return products

    @staticmethod
    def add_product(name, price, stock):
        conn = get_connection()
        with conn.cursor() as cursor:
            cursor.execute("INSERT INTO products (p_name, price, stock) VALUES (%s, %s, %s)",
                           (name, price, stock))
        conn.commit()
        conn.close()

app = Flask(__name__)


initialize_database()
@app.route('/')
@app.route("/products", methods=["GET"])
def get_products():
    return jsonify(Product.get_all())
@app.route('/')
@app.route("/products", methods=["POST"])
def add_product():
    data = request.json
    Product.add_product(data["p_name"], data["price"], data["stock"])
    return jsonify({"message": "Product added successfully"})

if __name__ == "__main__":
    app.run(debug=True)
