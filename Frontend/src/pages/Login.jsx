
import { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import './Login.css';
/*


export default function Login({ onLogin }) { 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Use your temporary Ngrok link or your live deployed backend URL
      const response = await fetch('https://your-backend-url.com/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        // 2. Save token so App.jsx remembers the session on refresh
        localStorage.setItem('chama_token', data.token);
        
        // 3. CRITICAL: Flip the 'isAuthenticated' state in App.jsx to true
        onLogin(); 
        
        // 4. Move inside the nested dashboard layout path
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
*/
export default function Login() {
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
            <label>email</label>
            <input 
              type="email" 
              required 
              placeholder="name@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-field-block">
            <label>password</label>
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