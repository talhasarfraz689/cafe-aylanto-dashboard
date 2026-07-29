import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from './store';

function Dashboard() {
  const navigate = useNavigate();
  const { user, logout } = useStore();
  const [currentDate, setCurrentDate] = useState('');
  const [currentDay, setCurrentDay] = useState('');
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setCurrentDate(now.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }));
      setCurrentDay(now.toLocaleDateString('en-GB', { weekday: 'long' }));
      setCurrentTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));
    };
    
    updateDateTime();
    const interval = setInterval(updateDateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dashboard-container">
      {/* Top Bar */}
      <header className="top-bar">
        <div className="brand-section">
          <div className="logo-container">
            <div className="logo-circle">
              <span className="logo-a">A</span>
              <i className="fa-solid fa-leaf logo-leaf"></i>
            </div>
          </div>
          <div className="brand-text">
            <h1>CAFE AYLANTO</h1>
            <div className="brand-subtitle">
              <span className="line"></span>
              <p>PREMIUM COFFEE EXPERIENCE</p>
              <span className="line"></span>
            </div>
          </div>
        </div>
        
        <div className="datetime-section">
          <div className="datetime-item">
            <div className="icon-circle">
              <i className="fa-regular fa-calendar"></i>
            </div>
            <div className="datetime-text">
              <span className="label">DATE</span>
              <span className="value">{currentDate}</span>
              <span className="sub-value">{currentDay}</span>
            </div>
          </div>
          <div className="datetime-divider"></div>
          <div className="datetime-item">
            <div className="icon-circle">
              <i className="fa-regular fa-clock"></i>
            </div>
            <div className="datetime-text">
              <span className="label">TIME</span>
              <span className="value">{currentTime}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        <div className="welcome-section">
          <h2 className="welcome-cursive">Welcome to</h2>
          <h1 className="welcome-brand">CAFE AYLANTO</h1>
          <div className="welcome-subtitle">
            <span className="line"></span>
            <i className="fa-solid fa-gem diamond"></i>
            <p>CHOOSE AN OPTION TO GET STARTED</p>
            <span className="line"></span>
          </div>
        </div>

        <div className="cards-container">
          {/* Card 1 */}
          <div className="card" onClick={() => navigate('/new-order')}>
            <div className="card-inner-border"></div>
            <div className="card-content">
              <div className="card-icon-wrapper">
                <i className="fa-solid fa-mug-hot"></i>
              </div>
              <h3>NEW ORDER</h3>
              <div className="card-divider">
                <span className="line"></span>
                <i className="fa-solid fa-gem diamond-small"></i>
                <span className="line"></span>
              </div>
              <p>Create a new<br />customer order</p>
            </div>
            <div className="card-footer">
              <div className="footer-icon">
                <i className="fa-solid fa-arrow-right"></i>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="card" onClick={() => navigate('/orders')}>
            <div className="card-inner-border"></div>
            <div className="card-content">
              <div className="card-icon-wrapper">
                <i className="fa-solid fa-clipboard-list"></i>
              </div>
              <h3>EXISTING ORDERS</h3>
              <div className="card-divider">
                <span className="line"></span>
                <i className="fa-solid fa-gem diamond-small"></i>
                <span className="line"></span>
              </div>
              <p>View and manage<br />previous orders</p>
            </div>
            <div className="card-footer">
              <div className="footer-icon">
                <i className="fa-solid fa-arrow-right"></i>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="card" onClick={() => navigate('/inventory')}>
            <div className="card-inner-border"></div>
            <div className="card-content">
              <div className="card-icon-wrapper">
                <i className="fa-solid fa-box-open"></i>
              </div>
              <h3>INVENTORY</h3>
              <div className="card-divider">
                <span className="line"></span>
                <i className="fa-solid fa-gem diamond-small"></i>
                <span className="line"></span>
              </div>
              <p>Manage stock and<br />inventory items</p>
            </div>
            <div className="card-footer">
              <div className="footer-icon">
                <i className="fa-solid fa-arrow-right"></i>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Bar */}
      <footer className="bottom-bar">
        <div className="user-info">
          <div className="user-icon">
            <i className="fa-regular fa-user"></i>
          </div>
          <div className="user-text">
            <span className="label">Logged in as</span>
            <span className="value">{user?.username || 'Guest'}</span>
          </div>
        </div>
        
        <div className="action-buttons">
          <button className="action-btn" onClick={() => navigate('/income')}>
            <div className="btn-icon">
              <i className="fa-solid fa-money-bill-trend-up"></i>
            </div>
            INCOME
          </button>
          <div className="btn-divider"></div>
          <button className="action-btn" onClick={logout}>
            <div className="btn-icon">
              <i className="fa-solid fa-arrow-right-from-bracket"></i>
            </div>
            LOGOUT
          </button>
        </div>
      </footer>
    </div>
  );
}

export default Dashboard;
