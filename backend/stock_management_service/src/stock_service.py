# stock_service.py

from stock_model import *

def add_or_update_stock(data):
    product_id = data.get("product_id")
    quantity = data.get("quantity")
    update_product_stock(product_id, quantity)

    if not all([product_id, quantity]):
        return {"message": "Missing fields"}, 400

    existing_stock = get_stock(product_id)
    if existing_stock:
        update_stock(product_id, quantity)
        return {"message": "Stock updated successfully"}, 200
    else:
        add_stock(product_id, quantity)
        return {"message": "Stock added successfully"}, 201

def fetch_all_stocks():
    stocks = get_all_stock()
    return [{
        "id": s[0],
        "product_name": s[1],
        "quantity": s[2]
    } for s in stocks], 200


def fetch_stock_by_product(product_id):
    stock = get_stock(product_id)
    if not stock:
        return {"message": "Stock not found"}, 404
    return {
        "product_id": stock[0],
        "quantity": stock[1]
    }, 200
