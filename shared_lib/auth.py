import jwt
import datetime
from flask import request, jsonify
from functools import wraps

SECRET_KEY = "your-secret-key"

def generate_token(email, role):
    payload = {
        "email": email,
        "role": role,
        "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=2)
    }
    return jwt.encode(payload, SECRET_KEY, algorithm="HS256")

def verify_token(token):
    try:
        return jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
    except jwt.ExpiredSignatureError:
        return "Token expired"
    except jwt.InvalidTokenError:
        return "Invalid token"

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if 'Authorization' in request.headers:
            token = request.headers['Authorization'].split(" ")[1]
        if not token:
            return jsonify({'message': 'Token is missing!'}), 401

        decoded = verify_token(token)
        if isinstance(decoded, str):
            return jsonify({'message': decoded}), 401

        return f(decoded['email'], *args, **kwargs)
    return decorated

