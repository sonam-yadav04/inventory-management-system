from flask_mysqldb import MySQL

mysql = MySQL()


def init_mysql(app):
    mysql.init_app(app)
    return mysql


def get_mysql():
    return mysql
