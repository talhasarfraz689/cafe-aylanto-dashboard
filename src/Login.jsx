import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from './store';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const login = useStore(state => state.login);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (login(username, password)) {
      navigate('/');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="dashboard-container" style={{ justifyContent: 'center', alignItems: 'center' }}>
      <div className="card" style={{ width: '400px', padding: '40px' }}>
        <div className="card-inner-border"></div>
        <div className="card-content">
          <div className="logo-circle" style={{ margin: '0 auto 20px auto' }}>
            <span className="logo-a">A</span>
            <i className="fa-solid fa-leaf logo-leaf"></i>
          </div>
          <h2 className="welcome-brand" style={{ fontSize: '32px', marginBottom: '10px' }}>LOGIN</h2>
          
          <div className="card-divider" style={{ marginBottom: '30px' }}>
            <span className="line"></span>
            <i className="fa-solid fa-gem diamond-small"></i>
            <span className="line"></span>
          </div>

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {error && <p style={{ color: '#d9534f', fontSize: '14px', margin: 0 }}>{error}</p>}
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', textAlign: 'left' }}>
              <label style={{ fontSize: '12px', color: 'var(--gold-dark)', fontWeight: 'bold' }}>USERNAME</label>
              <input 
                type="text" 
                value={username}
                onChange={e => setUsername(e.target.value)}
                style={{ 
                  padding: '12px', 
                  borderRadius: '8px', 
                  border: '1px solid var(--gold-dark)', 
                  background: 'rgba(35, 22, 14, 0.1)',
                  color: 'var(--text-dark)',
                  outline: 'none',
                  fontFamily: 'Outfit'
                }} 
              />
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', textAlign: 'left' }}>
              <label style={{ fontSize: '12px', color: 'var(--gold-dark)', fontWeight: 'bold' }}>PASSWORD</label>
              <input 
                type="password" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                style={{ 
                  padding: '12px', 
                  borderRadius: '8px', 
                  border: '1px solid var(--gold-dark)', 
                  background: 'rgba(35, 22, 14, 0.1)',
                  color: 'var(--text-dark)',
                  outline: 'none',
                  fontFamily: 'Outfit'
                }} 
              />
            </div>
            
            <button 
              type="submit" 
              className="action-btn" 
              style={{ 
                marginTop: '10px', 
                justifyContent: 'center', 
                background: 'linear-gradient(135deg, #3a2416 0%, #1e110b 100%)',
                color: 'var(--card-bg-light)',
                padding: '15px',
                borderRadius: '8px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
              }}
            >
              SIGN IN
            </button>
            <p style={{ fontSize: '12px', marginTop: '10px' }}>Hint: Use <strong>admin</strong> / <strong>admin</strong></p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
