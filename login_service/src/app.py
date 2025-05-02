from flask import Flask, request, jsonify, session
from flask_cors import CORS

from login_model import create_user, find_user_by_email, get_employees, get_admin
from login_service.utils.auth import generate_token, token_required
import re

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your-secret-key'
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

@app.route('/')
def home():
    return "Login service is running!"

@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    username = data['username']
    email = data['email']
    password = data['password']
    role = data['role']

    if find_user_by_email(email):
        return jsonify({"message": "User already exists"}), 409
    elif not re.match(r'[^@]+@[^@]+\.[^@]+', email):
        return jsonify({"message": "Invalid email address"}), 400
    elif not username or not password or not email:
        return jsonify({"message": "Please fill out all fields!"}), 400
    else:
        create_user(username, email, password, role)
        return jsonify({"message": "User registered successfully"}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data['email']
    password = data['password']
    user = find_user_by_email(email)

    if user and user[3] == password:
        token = generate_token(user[2], user[4])
        return jsonify({
            "message": "Login successful",
            "token": token,
            "user": {
                "id": user[0],
                "username": user[1],
                "email": user[2],
                "role": user[4]
            }
        }), 200
    else:
        return jsonify({"message": "Invalid credentials"}), 401

@app.route('/employees', methods=['GET'])

def employee():
    employees = get_employees()
    employee_list = [
        {"id": emp[0], "username": emp[1], "email": emp[2], "role": emp[4]}
        for emp in employees
    ]
    return jsonify(employee_list), 200

@app.route('/admin',methods =['GET'])
@token_required
def admin(current_user_email):
    admin = get_admin()
    admin_list = [
        {"id": ad[0] ,"username": ad[1],"email": ad[2], "role": ad[4]}
        for ad in admin
    ]
    return jsonify(admin_list),200

@app.route('/logout')
def logout():
    session.clear()
    return jsonify({"message": "Logged out successfully"}), 200

if __name__ == '__main__':
    app.run(debug=True, port=5000)
