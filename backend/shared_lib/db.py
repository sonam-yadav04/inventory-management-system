import os
from dotenv import load_dotenv
from flask_mysqldb import MySQL

load_dotenv()
mysql = MySQL()

def init_mysql(app):
    app.config['MYSQL_HOST'] = os.getenv('DB_HOST', 'localhost')
    app.config['MYSQL_PORT'] = int(os.getenv('DB_PORT', '3306'))
    app.config['MYSQL_USER'] = os.getenv('DB_USER', 'root')
    app.config['MYSQL_PASSWORD'] = os.getenv('DB_PASSWORD', '')
    app.config['MYSQL_DB'] = os.getenv('DB_NAME', 'inventory_db')
    mysql.init_app(app)
    return mysql

def get_mysql():
    return mysql