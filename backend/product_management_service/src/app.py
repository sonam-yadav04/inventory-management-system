from flask import Flask
from product_service import product_bp
from flask_cors import CORS
from shared_lib.db import init_mysql
from shared_lib import auth

app = Flask(__name__)

CORS(app)
mysql = init_mysql(app)

# Register Blueprint
app.register_blueprint(product_bp)

@app.route('/')
def home():
    return "Product Management Service is running!"


if __name__ == '__main__':
    app.run(port=5002, debug=True)
