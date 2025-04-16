import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./Login";
import {Signup}  from "./Signup";
import Dashboard from "./Dashboard";
import ProductList from "./productList";
import ProductForm from "./productForm";
import PrivateRoute from "./PrivateRoute";
import "./style.css";


    function App() {
    const [isLogin, setIsLogin] = useState(true);

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

      <Route path = "/ProductList" element = {<ProductList/>}/>
      <Route path = "/ProductForm" element = {<ProductForm/>}/>
    </Routes>
    </BrowserRouter>

    //  <div className="container">
    //  <h2>{isLogin ? "Login" : "Signup"} Form</h2>
    //  {isLogin ? <Login /> : <Signup />}
    //  <h4 className="toggle-btn" onClick={() => setIsLogin(!isLogin)} >
    //    {isLogin ? " don't have an accont? Signup" : " already  have an account? Login"}
    //  </h4>
       
    //  </div>
    //  </div>
    
 );
}
export default App;


