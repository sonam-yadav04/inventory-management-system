import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Link } from "react-router-dom";


export function Signup() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/signup', {
        username: formData.name,
        email: formData.email,
        password: formData.password,
      });

      console.log(" Response from backend:", response);

      if (response.data && response.data.message) {
        alert(" Signup successful");
        navigate("/Login");
      } else {
        alert("Signup successful (no message returned)");
      }
    } catch (error) {
      console.error("Error during signup:", error);

      if (error.response && error.response.data && error.response.data.message) {
        alert(error.response.data.message);
      } else {
        alert("Server error or connection failed.");
      }
    }
  };

  return (
    <div className ="container">
      <h2>Signup form</h2>
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />
      <button type="submit">Signup</button>
      <p>already have an account?<Link to="/Login">login</Link></p>
    </form>
    </div>
  );
}
