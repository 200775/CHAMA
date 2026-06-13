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
import { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import './Login.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple verification mock action
    localStorage.setItem('chama_token', 'mocked-secure-jwt');
    navigate('/dashboard');
  };

  return (
    <div className="auth-surface-container">
      <div className="login-glass-card">
        <h2>Welcome Back</h2>
        <p>Access your Chamaz account portal securely</p>
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="input-field-block">
            <label>Secure Email Address</label>
            <input 
              type="email" 
              required 
              placeholder="name@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-field-block">
            <label>Password Account Key</label>
            <input 
              type="password" 
              required 
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="login-submit-trigger">
            Authenticate Access
          </button>
        </form>
      </div>
    </div>
  );
}