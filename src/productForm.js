import React, { useState } from 'react';
import axios from 'axios';

function ProductForm() {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    quantity: ''
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/add_product', product);
      alert('✅ Product added successfully!');
      console.log(response.data);
      setProduct({ name: '', description: '', price: '', quantity: '' }); // reset form
    } catch (error) {
      console.error('❌ Error:', error.response?.data || error.message);
      alert('❌ Failed to add product!');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
      <input name="name" placeholder="Name" value={product.name} onChange={handleChange} required />
      <input name="description" placeholder="Description" value={product.description} onChange={handleChange} />
      <input name="price" placeholder="Price" type="number" value={product.price} onChange={handleChange} required />
      <input name="quantity" placeholder="Quantity" type="number" value={product.quantity} onChange={handleChange} />
      <button type="submit">Add Product</button>
    </form>
  );
}

export default ProductForm;
