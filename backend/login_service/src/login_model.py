
from login_service.utils.db import get_db_connection

def find_user_by_email(email):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM accounts WHERE email = %s", (email,))
    user = cursor.fetchone()
    conn.close()
    return user

def create_user(username, email, password, role):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO accounts (username, email, password, role) VALUES (%s, %s, %s, %s)",
        (username, email, password, role)
    )
    conn.commit()
    conn.close()

def get_employees():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM accounts WHERE role = 'employee'")
    employees = cursor.fetchall()
    conn.close()
    return employees

def get_admin():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM accounts WHERE role = 'admin'")
    admin = cursor.fetchall()
    conn.close()
    return admin
