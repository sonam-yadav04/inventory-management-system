// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { useState } from 'react';
// import { Link } from "react-router-dom";


// export function Signup() {
//   const [formData, setFormData] = useState({ name: '', email: '', password: '', role: ' ' });
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//      if(formData.name =="" ||formData.email ==""||formData.password =="" || formData.role == "" ){
//         alert("please fill the form");
//      }else{
//     try {
//       const response = await axios.post('http://localhost:5000/signup', {
//         username: formData.name,
//         email: formData.email,
//         password: formData.password,
//         role : formData.role,
//       });

//       console.log(" Response from backend:", response);

//       if (response.data && response.data.message) {
//         alert(" Signup successful");
//         navigate("/Login");
//       } else {
//         alert("Signup successful (no message returned)");
//       }
//     } catch (error) {
//       console.error("Error during signup:", error);

//       if (error.response && error.response.data && error.response.data.message) {
//         alert(error.response.data.message);
//       } else {
//         alert("Server error or connection failed.");
//       }
//     }
//   }
//   };

//   return (
//     <div className ="container">
//       <h2>Signup form</h2>
//     <form onSubmit={handleSubmit}>
//       <input
//         type="text"
//         placeholder="Name"
//         onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//       />
//       <input
//         type="email"
//         placeholder="Email"
//         onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//       />
//       <input
//       type="text"
//        placeholder="Role (admin/customer/employee)"
//        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
//      />

//       <button type="submit">Signup</button>
//       <p>already have an account?<Link to="/Login">login</Link></p>
//     </form>
//     </div>
//   );
// }
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Link } from "react-router-dom";

export function Signup() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: '',salary: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password || !formData.role) {
      alert("Please fill out all fields");
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/signup', {
        username: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role
      });

      if (response.data.message ) {
        alert("Signup successful!");
        navigate("/login");
      } else {
        alert("Signup succeeded but no message returned");
      }
    } catch (error) {
      console.error("Signup error:", error);  
      alert(error?.response?.data?.message || "Server error");
    }
  };

  return (
    <div className="container">
      <h2>Signup Form</h2><div className='signupimg'>
      <img alt='signup' src='C:\Users\sonam\sonamspyProjects\LOGIN_FORM\my-form\public\sign-up_8571617.png'/>
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
        <input type="email" placeholder="Email" onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
        <input type="password" placeholder="Password" onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
        <input type="text" placeholder="Role (admin/customer/employee)" onChange={(e) => setFormData({ ...formData, role: e.target.value })} />
        <button type="submit">Signup</button>
        <p>Already have an account? <Link to="/Login">Login</Link></p>
      </form>
    </div>
  );
}
