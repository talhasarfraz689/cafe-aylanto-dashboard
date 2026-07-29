import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from './store';

function Orders() {
  const navigate = useNavigate();
  const { orders, cancelOrder, completeOrder } = useStore();
  const [tab, setTab] = useState('pending'); // pending, delivered, cancelled

  const filteredOrders = orders.filter(o => o.status === tab);

  return (
    <div className="dashboard-container" style={{ padding: '30px 50px 0 50px', display: 'flex', flexDirection: 'column' }}>
      <header className="top-bar" style={{ padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.1)', flexShrink: 0 }}>
        <div className="brand-section" style={{ gap: '15px' }}>
          <button className="action-btn" onClick={() => navigate('/')} style={{ background: 'var(--gold-dark)', color: '#fff', padding: '10px 15px', borderRadius: '8px' }}>
            <i className="fa-solid fa-arrow-left"></i> BACK
          </button>
          <div className="brand-text">
            <h1 style={{ fontSize: '24px' }}>EXISTING ORDERS</h1>
          </div>
        </div>
      </header>

      <div style={{ display: 'flex', gap: '20px', marginTop: '20px', marginBottom: '10px', flexShrink: 0 }}>
        <button 
          onClick={() => setTab('pending')}
          style={{ padding: '10px 20px', background: tab === 'pending' ? 'var(--gold-dark)' : 'transparent', border: '1px solid var(--gold-dark)', color: tab === 'pending' ? 'var(--text-dark)' : 'var(--gold-bright)', borderRadius: '20px', cursor: 'pointer', fontFamily: 'Outfit', fontWeight: 'bold' }}
        >
          PENDING
        </button>
        <button 
          onClick={() => setTab('delivered')}
          style={{ padding: '10px 20px', background: tab === 'delivered' ? 'var(--gold-dark)' : 'transparent', border: '1px solid var(--gold-dark)', color: tab === 'delivered' ? 'var(--text-dark)' : 'var(--gold-bright)', borderRadius: '20px', cursor: 'pointer', fontFamily: 'Outfit', fontWeight: 'bold' }}
        >
          DELIVERED
        </button>
        <button 
          onClick={() => setTab('cancelled')}
          style={{ padding: '10px 20px', background: tab === 'cancelled' ? 'var(--gold-dark)' : 'transparent', border: '1px solid var(--gold-dark)', color: tab === 'cancelled' ? 'var(--text-dark)' : 'var(--gold-bright)', borderRadius: '20px', cursor: 'pointer', fontFamily: 'Outfit', fontWeight: 'bold' }}
        >
          CANCELLED
        </button>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', paddingRight: '15px', paddingBottom: '30px' }}>
        {filteredOrders.length === 0 ? (
          <p style={{ color: 'var(--text-muted)', textAlign: 'center', marginTop: '40px' }}>No {tab} orders found.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {filteredOrders.map(order => (
              <div key={order.id} style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '15px', padding: '20px', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '15px', marginBottom: '15px' }}>
                  <div>
                    <h3 style={{ color: 'var(--gold-bright)', margin: '0 0 5px 0', fontFamily: 'Cinzel' }}>Order {order.id}</h3>
                    <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>{new Date(order.time).toLocaleString()} | {order.table}</span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <h3 style={{ margin: '0 0 5px 0' }}>${order.total.toFixed(2)}</h3>
                    <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>Taker: {order.taker}</span>
                  </div>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div style={{ flex: 2 }}>
                    <h5 style={{ color: 'var(--gold-dark)', marginBottom: '10px' }}>ITEMS</h5>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '14px' }}>
                      {order.items.map((item, idx) => (
                        <li key={idx} style={{ marginBottom: '5px' }}>
                          <span style={{ color: 'var(--gold-bright)' }}>{item.quantity}x</span> {item.name} <span style={{ color: 'var(--text-muted)' }}>(${item.price.toFixed(2)})</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'flex-end', gap: '10px' }}>
                    {tab === 'pending' && (
                      <>
                        <button onClick={() => completeOrder(order.id)} style={{ padding: '8px 15px', background: 'var(--gold-dark)', color: 'var(--text-dark)', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>MARK DELIVERED</button>
                        <button onClick={() => cancelOrder(order.id)} style={{ padding: '8px 15px', background: 'transparent', color: '#ff4d4d', border: '1px solid #ff4d4d', borderRadius: '5px', cursor: 'pointer' }}>CANCEL ORDER</button>
                      </>
                    )}
                    {tab === 'delivered' && (
                      <span style={{ color: '#4caf50', fontWeight: 'bold', fontSize: '14px' }}><i className="fa-solid fa-check"></i> DELIVERED</span>
                    )}
                    {tab === 'cancelled' && (
                      <span style={{ color: '#ff4d4d', fontWeight: 'bold', fontSize: '14px' }}><i className="fa-solid fa-xmark"></i> CANCELLED</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Orders;
