import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editedProduct, setEditedProduct] = useState({});
  const [selectedProductId, setSelectedProductId] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios.get('http://localhost:5002/products')
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditedProduct(products[index]);
    setSelectedProductId(products[index].id);
  };

  const handleChange = (e) => {
    setEditedProduct({ ...editedProduct, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (id) => {
    try {
      await axios.put(`http://localhost:5002/products/${id}`, editedProduct);
      alert('Product updated successfully');
      setEditIndex(null);
      setSelectedProductId(null);
      fetchProducts();
    } catch (err) {
      alert('Failed to update');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5002/products/${id}`);
      alert('Product deleted successfully');
      setSelectedProductId(null);
      fetchProducts();
    } catch (err) {
      alert('Failed to delete');
    }
  };

  return (
    <div className='pl-container'>
      <h2 className='pl-h2'>Inventory List</h2>
      <table className='pl-table'>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price (Rs)</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p, index) => (
            <tr
              key={p.id}
              onClick={() => setSelectedProductId(p.id)}
              style={{ backgroundColor: selectedProductId === p.id ? '#f0f0f0' : 'transparent' }}
            >
              <td>{index + 1}</td>
              <td>
                {editIndex === index ? (
                  <input name="p_name" value={editedProduct.p_name} onChange={handleChange} />
                ) : (
                  p.p_name
                )}
              </td>
              <td>
                {editIndex === index ? (
                  <input name="description" value={editedProduct.description} onChange={handleChange} />
                ) : (
                  p.description
                )}
              </td>
              <td>
                {editIndex === index ? (
                  <input name="price" value={editedProduct.price} onChange={handleChange} />
                ) : (
                  `₹ ${p.price}`
                )}
              </td>
              <td>
                {editIndex === index ? (
                  <input name="stock" value={editedProduct.stock} onChange={handleChange} />
                ) : (
                  p.stock
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Buttons Section Below Table */}
      {selectedProductId !== null && (
        <div style={{ marginTop: '20px' }}>
          {editIndex !== null ? (
            <>
              <button onClick={() => handleUpdate(editedProduct.id)}>Save</button>
              <button onClick={() => { setEditIndex(null); setSelectedProductId(null); }}>Cancel</button>
            </>
          ) : (
            <>
              <button onClick={() => handleEdit(products.findIndex(p => p.id === selectedProductId))}>Edit</button>
              <button onClick={() => handleDelete(selectedProductId)} style={{ marginLeft: '5px' }}>Delete</button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default ProductList;
