# --- order_model.py ---
from shared_lib.db import *

def create_order(customer_id, product_id, quantity):
   mysql = get_mysql()
   cursor = mysql.connection.cursor()
   cursor.execute("""
        INSERT INTO orders (customer_id, product_id, quantity)
        VALUES (%s, %s, %s)
    """, (customer_id, product_id, quantity))
   mysql.connection.commit()
   cursor.close()


def get_all_orders():
    mysql = get_mysql()
    cursor = mysql.connection.cursor()
    cursor.execute("""
        SELECT o.id, o.customer_id, o.product_id, o.quantity, o.created_at, p.p_name
        FROM orders o JOIN products p ON o.product_id = p.id
    """)
    orders = cursor.fetchall()
    cursor.close()

    return orders

def get_order_by_id(order_id):
    mysql = get_mysql()
    cursor = mysql.connection.cursor()
    cursor.execute("SELECT * FROM orders WHERE id = %s", (order_id,))
    order = cursor.fetchone()
    cursor.close()
    return order
