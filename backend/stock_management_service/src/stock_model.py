from shared_lib.db import get_mysql


def get_stock(product_id):
    cur = get_mysql().connection.cursor()
    cur.execute("SELECT product_id, quantity FROM stock WHERE product_id = %s", (product_id,))
    row = cur.fetchone()
    cur.close()
    return row


def add_stock(product_id, quantity):
    mysql = get_mysql()
    cur = mysql.connection.cursor()
    cur.execute("INSERT INTO stock (product_id, quantity) VALUES (%s, %s)", (product_id, quantity))
    mysql.connection.commit()
    cur.close()


def update_stock(product_id, quantity):
    mysql = get_mysql()
    cur = mysql.connection.cursor()
    cur.execute("UPDATE stock SET quantity = %s WHERE product_id = %s", (quantity, product_id))
    mysql.connection.commit()
    cur.close()


def get_all_stock():
    cur = get_mysql().connection.cursor()
    cur.execute("""
        SELECT s.id, p.p_name, s.quantity
        FROM stock s JOIN products p ON s.product_id = p.id
    """)
    rows = cur.fetchall()
    cur.close()
    return rows


def update_product_stock(product_id, quantity):
    mysql = get_mysql()
    cur = mysql.connection.cursor()
    cur.execute("UPDATE products SET stock = %s WHERE id = %s", (quantity, product_id))
    mysql.connection.commit()
    cur.close()