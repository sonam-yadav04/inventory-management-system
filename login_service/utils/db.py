import mysql.connector
from mysql.connector import Error, pooling

def get_db_connection():
    return mysql.connector.connect(
        host="localhost",
        user="sonam",
        password="Sonam123",
        database="userlogin"
    )

