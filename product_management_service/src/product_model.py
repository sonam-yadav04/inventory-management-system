from flask_mysqldb import MySQL
mysql = MySQL()

def create_product(mysql, name, description, price, quantity):
    cur = mysql.connection.cursor()
    cur.execute(
        "INSERT INTO product2 (name, description, price, quantity) VALUES (%s, %s, %s, %s)",
        (name, description, price, quantity)
    )
    mysql.connection.commit()
    return cur.lastrowid

def get_all_products(mysql):
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM product2")
    products = cur.fetchall()
    print(products)
    return products
