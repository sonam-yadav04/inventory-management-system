import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StockList = () => {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5003/stock')
  .then(res => {
    const data = res.data[0]; // Extract the stock list only
    console.log("Parsed stocks:", data);
    setStocks(data);
  })
  .catch(err => console.error(err));

      
  }, []);
  

  return (
    <div>
      <h2>Stock List</h2>
      <table border="1" cellPadding="8">
  <thead>
    <tr>
      <th>Product Name</th>
      <th>Quantity</th>
    </tr>
  </thead>
  <tbody>
    {stocks.map(stock => (
      <tr key={stock.product_id}>
        <td>{stock.product_name}</td>
        <td>{stock.quantity}</td>
      </tr>
    ))}
  </tbody>
</table>

    </div>
  );
};

export default StockList;
