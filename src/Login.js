
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
          const user = res.data.user;

          localStorage.setItem("user", JSON.stringify({
            name: user.name,
            role: user.role,
          }));
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
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { Link } from "react-router-dom";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   //const[role , setRo] = useState("");
//   const navigate = useNavigate();

  

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("http://localhost:5000/login", { email, password });

//       if ( res.data.message ==="login successful" ) {
//         // ✅ Save JWT token and role to localStorage
//         // localStorage.setItem("token", res.data.token);
//         // localStorage.setItem("userRole", res.data.user.role);
//         // localStorage.setItem("userName", res.data.user.name);

//         alert("Login successful!");
//         navigate("/dashboard");  // or /dashboard based on role
//       } else {
//         //alert("invailid user");
//         alert(res.data.message);
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Server error");
//     }
//   };

//   return (
//     <div className="container">
//       <h2>Login Form</h2>
//       <form onSubmit={handleLogin} className="form">
//         <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
//         <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
//         {/* <input type="text" placeholder="role" onChange={(e) => setRole(e.target.value)}  /> */}
//         <button type="submit">Login</button>
//         <p>Don't have an account? <Link to="/Signup">Signup</Link></p>
//       </form>
//     </div>
//   );
// }
