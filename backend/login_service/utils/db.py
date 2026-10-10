import os
import mysql.connector
from mysql.connector import pooling
from dotenv import load_dotenv

load_dotenv()

_pool = None

def _get_pool():
    global _pool
    if _pool is None:
        _pool = pooling.MySQLConnectionPool(
            pool_name="login_pool",
            pool_size=5,
            host=os.environ["DB_HOST"],
            port=int(os.getenv("DB_PORT", "3306")),
            user=os.environ["DB_USER"],
            password=os.environ["DB_PASSWORD"],
            database=os.environ["DB_NAME"],
        )
    return _pool

def get_db_connection():
    return _get_pool().get_connection()