
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });

      if (res.data.message === "Login successful") {
        localStorage.setItem('token', 'someRandomTokenOrUserID');
        alert("Login successful");
        navigate("/dashboard");
       } else {
        alert("" + res.data.message);
      }
    } catch (err) {
      console.error(err);
      alert(" Server error");
    }
  };

  return (
    <div className ="container">
      <h2>Login form</h2>
    <form onSubmit={handleLogin} className="form">
    
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit">Login</button>
      <p>don't have an account?<Link to="/Signup">signup</Link></p>
         <signup/>
    </form>
    </div>
  );
}
