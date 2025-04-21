from flask_mysqldb import *

def create_product(mysql, name, description, price, quantity):
    cur = mysql.connection.cursor()
    cur.execute(
        "INSERT INTO products (name, description, price, quantity) VALUES (%s, %s, %s, %s)",
        (name, description, price, quantity)
    )
    mysql.connection.commit()
    return cur.lastrowid

def get_all_products(mysql):
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM products")
    products = cur.fetchall()
    return products
