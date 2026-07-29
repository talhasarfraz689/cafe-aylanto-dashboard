import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from './store';

function NewOrder() {
  const navigate = useNavigate();
  const { inventory, placeOrder, user } = useStore();
  const [cart, setCart] = useState([]);
  const [table, setTable] = useState('Table 1');

  const addToCart = (item) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        if (existing.quantity >= item.stock) return prev; // check stock limit
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      if (item.stock > 0) {
        return [...prev, { ...item, quantity: 1 }];
      }
      return prev;
    });
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(i => i.id !== id));
  };

  const updateQuantity = (id, delta) => {
    setCart(prev => prev.map(i => {
      if (i.id === id) {
        const itemInStock = inventory.find(inv => inv.id === id);
        const newQ = i.quantity + delta;
        if (newQ > 0 && newQ <= itemInStock.stock) {
          return { ...i, quantity: newQ };
        }
      }
      return i;
    }));
  };

  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handleFinish = () => {
    if (cart.length === 0) return;
    placeOrder(cart, table, user?.username || 'Admin');
    navigate('/orders'); // redirect to orders after placing
  };

  return (
    <div className="dashboard-container" style={{ padding: '30px 50px 0 50px' }}>
      <header className="top-bar" style={{ padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <div className="brand-section" style={{ gap: '15px' }}>
          <button className="action-btn" onClick={() => navigate('/')} style={{ background: 'var(--gold-dark)', color: '#fff', padding: '10px 15px', borderRadius: '8px' }}>
            <i className="fa-solid fa-arrow-left"></i> BACK
          </button>
          <div className="brand-text">
            <h1 style={{ fontSize: '24px' }}>NEW ORDER</h1>
          </div>
        </div>
      </header>

      <div style={{ display: 'flex', gap: '30px', marginTop: '20px', height: 'calc(100% - 80px)', overflow: 'hidden' }}>
        {/* Menu Section */}
        <div style={{ flex: 2, overflowY: 'auto', paddingRight: '15px' }}>
          <h2 style={{ color: 'var(--gold-bright)', marginBottom: '15px', fontFamily: 'Cinzel' }}>MENU ITEMS</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '15px' }}>
            {inventory.map(item => (
              <div 
                key={item.id} 
                className="card" 
                style={{ 
                  width: '100%', 
                  minHeight: '140px', 
                  padding: '15px', 
                  cursor: item.stock > 0 ? 'pointer' : 'not-allowed', 
                  opacity: item.stock > 0 ? 1 : 0.5,
                  backgroundImage: item.image ? `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.8)), url(${item.image})` : 'none',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
                onClick={() => item.stock > 0 && addToCart(item)}
              >
                <div className="card-inner-border"></div>
                <h4 style={{ color: 'var(--gold-bright)', fontFamily: 'Cinzel', fontSize: '16px' }}>{item.name}</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '12px' }}>{item.category}</p>
                <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', width: '100%', position: 'relative', zIndex: 5 }}>
                  <span style={{ fontWeight: 'bold', color: 'var(--gold-dark)' }}>${item.price.toFixed(2)}</span>
                  <span style={{ fontSize: '11px', color: item.stock > 0 ? 'var(--gold-dark)' : 'red' }}>
                    {item.stock > 0 ? `Stock: ${item.stock}` : 'OUT OF STOCK'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cart Section */}
        <div style={{ flex: 1, background: 'rgba(255,255,255,0.05)', borderRadius: '15px', padding: '20px', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column' }}>
          <h2 style={{ color: 'var(--gold-bright)', marginBottom: '15px', fontFamily: 'Cinzel', display: 'flex', justifyContent: 'space-between' }}>
            CURRENT ORDER
            <select 
              value={table} 
              onChange={e => setTable(e.target.value)}
              style={{ background: 'transparent', color: 'var(--gold-bright)', border: '1px solid var(--gold-dark)', borderRadius: '5px', padding: '2px 5px', fontFamily: 'Outfit' }}
            >
              {[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={`Table ${n}`} style={{color:'#000'}}>Table {n}</option>)}
            </select>
          </h2>

          <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {cart.length === 0 ? (
              <p style={{ color: 'var(--text-muted)', textAlign: 'center', marginTop: '40px' }}>Cart is empty</p>
            ) : (
              cart.map(item => (
                <div key={item.id} style={{ background: 'rgba(0,0,0,0.3)', padding: '10px 15px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h5 style={{ margin: 0, fontSize: '14px', color: 'var(--gold-bright)' }}>{item.name}</h5>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>${item.price.toFixed(2)}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <button onClick={() => updateQuantity(item.id, -1)} style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer' }}><i className="fa-solid fa-minus"></i></button>
                    <span style={{ fontSize: '14px', width: '20px', textAlign: 'center' }}>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)} style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer' }}><i className="fa-solid fa-plus"></i></button>
                    <button onClick={() => removeFromCart(item.id)} style={{ background: 'transparent', border: 'none', color: '#ff4d4d', cursor: 'pointer', marginLeft: '5px' }}><i className="fa-solid fa-trash"></i></button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div style={{ marginTop: '15px', paddingTop: '15px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', fontSize: '20px', fontWeight: 'bold' }}>
              <span>TOTAL:</span>
              <span style={{ color: 'var(--gold-bright)' }}>${total.toFixed(2)}</span>
            </div>
            <button 
              onClick={handleFinish}
              disabled={cart.length === 0}
              style={{ 
                width: '100%', 
                padding: '15px', 
                background: cart.length > 0 ? 'var(--gold-dark)' : '#555', 
                color: cart.length > 0 ? 'var(--text-dark)' : '#999', 
                border: 'none', 
                borderRadius: '8px',
                fontWeight: 'bold',
                fontSize: '16px',
                cursor: cart.length > 0 ? 'pointer' : 'not-allowed',
                fontFamily: 'Outfit'
              }}
            >
              FINISH ORDER
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewOrder;
