import React, { useState } from 'react';
import axios from 'axios';

const StockForm = () => {
  const [formData, setFormData] = useState({ product_id: '', quantity: '' }); // FIXED

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5003/stock', formData);
      alert(res.data.message);
      console.log("Response:", res.data); 
    } catch (error) {
      console.error("Error response:", error.res); 
      alert(error.response?.data?.message || 'Error updating stock');
      
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="product_id" placeholder="Product ID" onChange={handleChange} />
      <input name="quantity" placeholder="Quantity" onChange={handleChange} />
      <button type="submit">Update Stock</button>
    </form>
  );
};

export default StockForm;
