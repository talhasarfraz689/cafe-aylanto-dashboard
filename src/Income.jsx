import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from './store';

function Income() {
  const navigate = useNavigate();
  const { orders } = useStore();
  const [filter, setFilter] = useState('daily'); // daily, weekly, monthly, yearly

  const calculateIncome = () => {
    const now = new Date();
    
    return orders
      .filter(o => o.status === 'delivered')
      .filter(o => {
        const orderDate = new Date(o.time);
        if (filter === 'daily') {
          return orderDate.toDateString() === now.toDateString();
        } else if (filter === 'weekly') {
          const oneWeekAgo = new Date();
          oneWeekAgo.setDate(now.getDate() - 7);
          return orderDate >= oneWeekAgo && orderDate <= now;
        } else if (filter === 'monthly') {
          return orderDate.getMonth() === now.getMonth() && orderDate.getFullYear() === now.getFullYear();
        } else if (filter === 'yearly') {
          return orderDate.getFullYear() === now.getFullYear();
        }
        return true;
      })
      .reduce((sum, order) => sum + order.total, 0);
  };

  const currentIncome = calculateIncome();

  return (
    <div className="dashboard-container" style={{ padding: '30px 50px 0 50px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <header className="top-bar" style={{ padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.1)', flexShrink: 0, width: '100%' }}>
        <div className="brand-section" style={{ gap: '15px' }}>
          <button className="action-btn" onClick={() => navigate('/')} style={{ background: 'var(--gold-dark)', color: '#fff', padding: '10px 15px', borderRadius: '8px' }}>
            <i className="fa-solid fa-arrow-left"></i> BACK
          </button>
          <div className="brand-text">
            <h1 style={{ fontSize: '24px' }}>INCOME DASHBOARD</h1>
          </div>
        </div>
      </header>

      <div style={{ marginTop: '50px', display: 'flex', gap: '20px' }}>
        <button 
          onClick={() => setFilter('daily')}
          style={{ padding: '10px 20px', background: filter === 'daily' ? 'var(--gold-dark)' : 'transparent', border: '1px solid var(--gold-dark)', color: filter === 'daily' ? 'var(--text-dark)' : 'var(--gold-bright)', borderRadius: '20px', cursor: 'pointer', fontFamily: 'Outfit', fontWeight: 'bold' }}
        >
          DAILY
        </button>
        <button 
          onClick={() => setFilter('weekly')}
          style={{ padding: '10px 20px', background: filter === 'weekly' ? 'var(--gold-dark)' : 'transparent', border: '1px solid var(--gold-dark)', color: filter === 'weekly' ? 'var(--text-dark)' : 'var(--gold-bright)', borderRadius: '20px', cursor: 'pointer', fontFamily: 'Outfit', fontWeight: 'bold' }}
        >
          WEEKLY
        </button>
        <button 
          onClick={() => setFilter('monthly')}
          style={{ padding: '10px 20px', background: filter === 'monthly' ? 'var(--gold-dark)' : 'transparent', border: '1px solid var(--gold-dark)', color: filter === 'monthly' ? 'var(--text-dark)' : 'var(--gold-bright)', borderRadius: '20px', cursor: 'pointer', fontFamily: 'Outfit', fontWeight: 'bold' }}
        >
          MONTHLY
        </button>
        <button 
          onClick={() => setFilter('yearly')}
          style={{ padding: '10px 20px', background: filter === 'yearly' ? 'var(--gold-dark)' : 'transparent', border: '1px solid var(--gold-dark)', color: filter === 'yearly' ? 'var(--text-dark)' : 'var(--gold-bright)', borderRadius: '20px', cursor: 'pointer', fontFamily: 'Outfit', fontWeight: 'bold' }}
        >
          YEARLY
        </button>
      </div>

      <div style={{ marginTop: '60px', background: 'rgba(255,255,255,0.05)', padding: '60px', borderRadius: '20px', border: '1px solid var(--gold-dark)', textAlign: 'center', width: '100%', maxWidth: '500px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
        <h2 style={{ color: 'var(--text-muted)', fontFamily: 'Outfit', marginBottom: '20px', letterSpacing: '2px' }}>
          {filter.toUpperCase()} INCOME
        </h2>
        <h1 style={{ color: 'var(--gold-bright)', fontFamily: 'Cinzel', fontSize: '64px', margin: 0 }}>
          ${currentIncome.toFixed(2)}
        </h1>
        <div style={{ marginTop: '30px', color: 'var(--text-light)', opacity: 0.7, fontSize: '14px' }}>
          Based on delivered orders only.
        </div>
      </div>
    </div>
  );
}

export default Income;
