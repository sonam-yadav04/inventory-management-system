// OrderForm.js
import React, { useState } from 'react';
import axios from 'axios';

const OrderForm = () => {
  const [formData, setFormData] = useState({ customer_id: '', product_id: '', quantity: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5004/orders', formData);
      alert(res.data.message);
    } catch (error) {
      alert(error.response?.data?.message || 'Error placing order');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="customer_id" placeholder="Customer ID" onChange={handleChange} />
      <input name="product_id" placeholder="Product ID" onChange={handleChange} />
      <input name="quantity" placeholder="Quantity" onChange={handleChange} />
      <button type="submit">Place Order</button>
    </form>
  );
};

export default OrderForm;

