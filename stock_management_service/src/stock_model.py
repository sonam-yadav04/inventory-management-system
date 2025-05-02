# stock_model.py

from shared_lib.db import get_mysql

def product_exists(product_id):
    mysql = get_mysql()
    cursor = mysql.connection.cursor()
    cursor.execute("SELECT id FROM products WHERE id = %s", (product_id,))
    result = cursor.fetchone()
    cursor.close()
    return result is not None


def add_stock(product_id, quantity):
    mysql = get_mysql()
    cursor = mysql.connection.cursor()
    cursor.execute("""
        INSERT INTO stock (product_id, quantity)
        VALUES (%s, %s)
        ON DUPLICATE KEY UPDATE quantity = quantity + %s
    """, (product_id, quantity, quantity))
    mysql.connection.commit()
    print(add_stock)
    cursor.close()

def update_stock(product_id, quantity):
    mysql = get_mysql()
    cursor = mysql.connection.cursor()
    cursor.execute("""
        UPDATE stock
        SET quantity = %s
        WHERE product_id = %s
    """, (quantity, product_id))
    mysql.connection.commit()
    cursor.close()
    print(f"Updating stock for product_id={product_id} with quantity={quantity}")

def update_product_stock(product_id, quantity):
    mysql = get_mysql()
    cursor = mysql.connection.cursor()
    cursor.execute("""
            UPDATE products
            SET stock = %s
            WHERE id = %s
        """, (quantity, product_id))
    mysql.connection.commit()
    cursor.close()


def get_stock(product_id):
    mysql = get_mysql()
    cursor = mysql.connection.cursor()
    cursor.execute("""
        SELECT product_id, quantity
        FROM stock
        WHERE product_id = %s
    """, (product_id,))
    stock = cursor.fetchone()
    cursor.close()
    return stock

def get_all_stock():
    mysql = get_mysql()
    cursor = mysql.connection.cursor()
    cursor.execute("""
        SELECT s.id, p.p_name, s.quantity
        FROM stock s
        JOIN products p ON s.product_id = p.id
    """)
    stocks = cursor.fetchall()
    cursor.close()
    return stocks
