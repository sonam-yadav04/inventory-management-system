import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5002/products')
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h2>Inventory List</h2>
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            {p.name} - {p.description} - ${p.price} - Qty: {p.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
