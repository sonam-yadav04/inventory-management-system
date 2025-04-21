from flask import Flask, request, jsonify,session 
from flask_cors import CORS
from flask_mysqldb import MySQL
import re

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})
 

# MySQL config
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'Sonam123'
app.config['MYSQL_DB'] = 'userlogin'

mysql = MySQL(app)

@app.route('/')
def home():
    return "Flask backend is working!"


@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    print("Received signup data:", data)
    name = data['username']
    email = data['email']
    password = data['password']
    role =     data['role']

    cursor = mysql.connection.cursor()
    cursor.execute('SELECT * FROM accounts WHERE email = %s', (email,))
    account = cursor.fetchone()

    if account:
        return jsonify({"message": "User already exists"}), 409

    elif not re.match(r'[^@]+@[^@]+\.[^@]+', email):
        return jsonify({"message": "Invalid email address!"}), 400

    elif not name or not password or not email:
        return jsonify({"message": "Please fill out all fields!"}), 400

    else:
        cursor.execute('INSERT INTO accounts (username, email, password,role) VALUES (%s, %s, %s, %s)', (name, email, password, role))
        mysql.connection.commit()
        cursor.close()
        return jsonify({"message": "User registered successfully"}), 201


@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data['email']
    password = data['password']

    cursor = mysql.connection.cursor()
    cursor.execute("SELECT * FROM accounts WHERE email=%s AND password=%s", (email, password))
    user = cursor.fetchone()
    cursor.close()

    if user:
        return jsonify({"message": "Login successful", "user": {
            "id": user[0], "name": user[1], "email": user[2],  "role": user[4]
        }}), 200
    else:
        return jsonify({"message": "Invalid credentials"}), 401

@app.route('/profile', methods=['GET'])
def get_all_employees():
    try:
        cursor = mysql.connection.cursor()
        cursor.execute("SELECT * FROM accounts WHERE role = 'employee'")
        employees = cursor.fetchall()
        cursor.close()

        employee_list = []
        for emp in employees:
            employee_list.append({
                "id": emp[0],
                "username": emp[1],
                "email": emp[2],
                "role": emp[3]
            })

        return jsonify(employee_list), 200

    except Exception as e:
        return jsonify({"message": "Error retrieving employees", "error": str(e)}), 500



@app.route('/logout')
def logout():
    session.clear()
    return jsonify({"message": "Login successful"}), 
 

if __name__ == '__main__':
    app.run(debug=True)
