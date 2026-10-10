//import React, { useState } from "react";
import { BrowserRouter as router ,Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./Login";
import {Signup}  from "./Signup";
import Dashboard from "./Dashboard";
import ProductList from "./ProductList";
import ProductForm from "./ProductForm";
import PrivateRoute from "./PrivateRoute";
import Employee from "./Employee";
import OrderForm from "./OrderForm";
import OrderList from "./OrderList";
import StockForm from "./StockForm";
import StockList from "./StockList";
import "./style.css";


    function App() {
    //const [isLogin, setIsLogin] = useState(true);

  return (
   
    <BrowserRouter>
    <Routes>
      <Route path = "/" element = {<Signup/>}/>
      <Route path = "/Signup" element = {<Signup/>}/>
      <Route path = "/Login" element = {<Login/>}/>
      <Route path="/dashboard" element={
       <PrivateRoute>
       <Dashboard />
      </PrivateRoute>
       } />
      <Route  path="/products"
        element={
     <PrivateRoute allowedRoles={["admin"]}>
       <ProductList />
       <productForm/>
    </PrivateRoute>
  }/>
        <Route path = "/ProductForm" element = {<ProductForm/>}/>
      <Route path = "/ProductList" element = {<ProductList/>}/>
      <Route path = "/orderForm" element = {<OrderForm/>}/>
      <Route path = "/orderList" element = {<OrderList/>}/>
      
      <Route path = "/Employee" element = {<Employee/>}/>
      <Route path = "/StockForm" element = {<StockForm/>}/>
      <Route path = "/stockList" element = {<StockList/>}/>

    </Routes>
    </BrowserRouter>

   
 );
}
export default App;


