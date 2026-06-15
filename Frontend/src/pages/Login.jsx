
import { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import './Login.css';
export default function Login({ onLogin }) { 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('https://z4pvw5m6-5000.uks1.devtunnels.ms/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('chama_token', data.token);
        onLogin(); 
        navigate('/dashboard/contributions');
      } else {
        alert(data.message || 'Database authentication failed!');
      }
    } catch (err) {
      console.error('Network connection error:', err);
      alert('Cannot connect to your local backend server.');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <h2>Chama Authentication</h2>
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Authenticate Access</button>
      </form>
    </div>
  );
}
