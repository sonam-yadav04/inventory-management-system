# login_service/utils/auth.py
import jwt
import datetime
from flask import request, jsonify
from functools import wraps

SECRET_KEY = "your_secret_key"

def generate_token(user_id, role):
    payload = {
        'user_id': user_id,
        'role': role,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=5)
    }
    return jwt.encode(payload, SECRET_KEY, algorithm='HS256')

def verify_token(token):
    try:
        return jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None

def token_required(role=None):
    def decorator(f):
        @wraps(f)
        def wrapper(*args, **kwargs):
            token = request.headers.get("Authorization")
            if not token:
                return jsonify({"message": "Token is missing!"}), 401
            try:
                decoded = verify_token(token)
                if decoded is None or (role and decoded.get("role") != role):
                    return jsonify({"message": "Access denied!"}), 403
                return f(decoded, *args, **kwargs)
            except Exception as e:
                return jsonify({"message": "Token is invalid!"},e), 401
        return wrapper
    return decorator
