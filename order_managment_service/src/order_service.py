from order_model import create_order, get_all_orders, get_order_by_id
from flask import jsonify
def place_order(data):
    customer_id = data.get("customer_id")
    product_id = data.get("product_id")
    quantity = data.get("quantity")

    if not all([customer_id, product_id, quantity]):

        return jsonify({"message": "missing fields"}),

    create_order(customer_id, product_id, quantity)

    return jsonify({"message": "Order placed successfully"}), 201


def fetch_orders():
    orders = get_all_orders()
    return [{
        "id": o[0], "customer_id": o[1], "product_id": o[2], "quantity": o[3],
        "created_at": str(o[4]), "product_name": o[5]
    } for o in orders], 200

def fetch_order(order_id):
    order = get_order_by_id(order_id)
    if not order:
        return jsonify({"message": "Order not found"}), 404

    return {
        "id": order[0], "customer_id": order[1], "product_id": order[2],
        "quantity": order[3], "created_at": str(order[4])
    }, 200