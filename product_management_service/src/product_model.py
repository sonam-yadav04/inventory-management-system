from flask_mysqldb import MySQL
mysql = MySQL()

def create_product(mysql, p_name, price, stock, description):
    cur = mysql.connection.cursor()
    cur.execute(
        "INSERT INTO products(name, price, stock, description) VALUES (%s, %s, %s, %s)",
        (p_name, description, price, stock)
    )
    mysql.connection.commit()
    return cur.lastrowid

def get_all_products(mysql):
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM products")
    products = cur.fetchall()
    print(products)
    return products
