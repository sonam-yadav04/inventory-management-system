import React, { useState } from 'react';
import {  useNavigate } from 'react-router-dom';
//import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function ProductForm() {
 const history = useNavigate();
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
      const response = await axios.post('http://localhost:5002/add_products',{ name:product.name,
     description:product.description,
     price:product.price,
     quantity:product.quantity,
      }
      );
      alert(' Product added successfully!');
      console.log(response.data);
       history("/Dashboard");
      //setProduct({ name: '', description: '', price: '', quantity: '' }); // reset form
    } catch (error) {
      console.error('Error:', error.response?.data || error.message);
      alert(' Failed to add product!');
    }
  };

  return (
   <div className = "product">
    <form onSubmit={handleSubmit} >
      <input name="name" placeholder="Name" value={product.name} onChange={handleChange} required />
      <input name="description" placeholder="Description" value={product.description} onChange={handleChange} />
      <input name="price" placeholder="Price" type="number" value={product.price} onChange={handleChange} required />
      <input name="quantity" placeholder="Quantity" type="number" value={product.quantity} onChange={handleChange} />
      <button type="submit">Add Product</button>

    </form>
    </div>
  );
}

export default ProductForm;
