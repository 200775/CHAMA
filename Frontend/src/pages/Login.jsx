import axios from "axios";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; 

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    try {
      // Using your active VS Code Dev Tunnel URL
      const response = await fetch('https://z4pvw5m6-5000.uks1.devtunnels.ms/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('chama_token', data.token);
        localStorage.setItem('chama_email', email);
        onLogin(); 
        navigate('/dashboard');
      } else {
        setErrorMessage(data.message || 'Invalid credentials. Please try again.');
      }
    } catch (err) {
      console.error('Connection error:', err);
      setErrorMessage('Unable to connect to the Chama server. Ensure backend is running.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page-wrapper">
      <div className="login-card animate-fade-in">
        
        <div className="login-header">
          <div className="chama-logo-icon">🇰🇪</div>
          <h1>Chamaz</h1>
          <p>Secure Bookkeeping & Financial Portal</p>
        </div>

        {errorMessage && (
          <div className="error-alert animate-shake">
            <span>⚠️</span> {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              placeholder="name@chama.or.ke"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Account Password</label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <button type="submit" className="login-submit-btn" disabled={isLoading}>
            {isLoading ? (
              <div className="spinner"></div>
            ) : (
              'Authenticate Access'
            )}
          </button>
        </form>

        <div className="login-footer">
          <p>Authorized personnel only. Sessions are fully encrypted.</p>
        </div>
      </div>
    </div>
  );
}