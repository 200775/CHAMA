/*
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://chamazyl.up.railway.app",
        formData
      );
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (error) {
      alert("Invalid login credentials");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Chamaz</h1>
        <p>Manage savings, loans & members easily</p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            onChange={handleChange}
          />

          <button type="submit">Login</button>
        </form>

        <span>
          No account? <Link to="/register">Create one</Link>
        </span>
      </div>
    </div>
  );
}

export default Login;*/
import { useNavigate } from 'react-router-dom';

export default function Login({ onLogin }) {
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();
  
    onLogin(); 
    navigate('/');
  };

  return (
    <div style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center', background: '#f4f4f4' }}>
      <form onSubmit={handleSignIn} style={{ background: 'white', padding: '40px', borderRadius: '8px', textAlign: 'center', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
        <h2>Chamaz</h2>
        <input type="text" placeholder="Username" required style={{ display: 'block', margin: '10px auto', padding: '8px' }} />
        <input type="password" placeholder="Password" required style={{ display: 'block', margin: '10px auto', padding: '8px' }} />
        <button type="submit" style={{ marginTop: '20px', padding: '10px 20px', cursor: 'pointer' }}>Sign In</button>
      </form>
    </div>
  );
}