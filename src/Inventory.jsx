import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from './store';

function Inventory() {
  const navigate = useNavigate();
  const { inventory, addInventoryItem, updateInventoryItem } = useStore();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [formData, setFormData] = useState({ name: '', category: 'Coffee', price: '', stock: '' });

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.stock) return;
    
    if (editingId) {
      updateInventoryItem(editingId, {
        name: formData.name,
        category: formData.category,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock)
      });
      setEditingId(null);
    } else {
      addInventoryItem({
        name: formData.name,
        category: formData.category,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock)
      });
    }
    
    setFormData({ name: '', category: 'Coffee', price: '', stock: '' });
    setShowAddForm(false);
  };

  const handleEdit = (item) => {
    setFormData({ name: item.name, category: item.category, price: item.price, stock: item.stock });
    setEditingId(item.id);
    setShowAddForm(true);
  };

  return (
    <div className="dashboard-container" style={{ padding: '30px 50px 0 50px', display: 'flex', flexDirection: 'column' }}>
      <header className="top-bar" style={{ padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.1)', flexShrink: 0 }}>
        <div className="brand-section" style={{ gap: '15px' }}>
          <button className="action-btn" onClick={() => navigate('/')} style={{ background: 'var(--gold-dark)', color: '#fff', padding: '10px 15px', borderRadius: '8px' }}>
            <i className="fa-solid fa-arrow-left"></i> BACK
          </button>
          <div className="brand-text">
            <h1 style={{ fontSize: '24px' }}>INVENTORY</h1>
          </div>
        </div>
        <div>
          <button 
            onClick={() => { setShowAddForm(!showAddForm); setEditingId(null); setFormData({ name: '', category: 'Coffee', price: '', stock: '' }); }}
            style={{ padding: '10px 20px', background: 'var(--gold-dark)', color: 'var(--text-dark)', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            <i className="fa-solid fa-plus"></i> ADD NEW ITEM
          </button>
        </div>
      </header>

      {showAddForm && (
        <div style={{ background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '15px', marginTop: '20px', border: '1px solid var(--gold-dark)' }}>
          <h3 style={{ color: 'var(--gold-bright)', marginBottom: '15px' }}>{editingId ? 'EDIT ITEM' : 'ADD NEW ITEM'}</h3>
          <form onSubmit={handleAddSubmit} style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
            <input required type="text" placeholder="Item Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} style={{ flex: 1, minWidth: '200px', padding: '10px', borderRadius: '5px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(0,0,0,0.3)', color: '#fff' }} />
            <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} style={{ padding: '10px', borderRadius: '5px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(0,0,0,0.3)', color: '#fff' }}>
              <option value="Coffee">Coffee</option>
              <option value="Food">Food</option>
              <option value="Merch">Merch</option>
            </select>
            <input required type="number" step="0.01" placeholder="Price ($)" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} style={{ width: '120px', padding: '10px', borderRadius: '5px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(0,0,0,0.3)', color: '#fff' }} />
            <input required type="number" placeholder="Stock Qty" value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} style={{ width: '120px', padding: '10px', borderRadius: '5px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(0,0,0,0.3)', color: '#fff' }} />
            <button type="submit" style={{ padding: '10px 20px', background: 'var(--gold-dark)', color: 'var(--text-dark)', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>SAVE</button>
            <button type="button" onClick={() => setShowAddForm(false)} style={{ padding: '10px 20px', background: 'transparent', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '5px', cursor: 'pointer' }}>CANCEL</button>
          </form>
        </div>
      )}

      <div style={{ flex: 1, overflowY: 'auto', marginTop: '20px', paddingRight: '15px', paddingBottom: '30px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.2)', color: 'var(--gold-bright)', fontFamily: 'Cinzel' }}>
              <th style={{ padding: '15px 10px' }}>Item Name</th>
              <th style={{ padding: '15px 10px' }}>Category</th>
              <th style={{ padding: '15px 10px' }}>Price</th>
              <th style={{ padding: '15px 10px' }}>Stock</th>
              <th style={{ padding: '15px 10px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map(item => (
              <tr key={item.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '15px 10px', fontWeight: 'bold', color: 'var(--text-light)' }}>{item.name}</td>
                <td style={{ padding: '15px 10px', color: 'var(--text-muted)' }}>{item.category}</td>
                <td style={{ padding: '15px 10px' }}>${item.price.toFixed(2)}</td>
                <td style={{ padding: '15px 10px', color: item.stock < 10 ? '#ff4d4d' : 'var(--text-light)' }}>
                  {item.stock} {item.stock < 10 && <span style={{ fontSize: '10px' }}>(LOW)</span>}
                </td>
                <td style={{ padding: '15px 10px', textAlign: 'right' }}>
                  <button onClick={() => handleEdit(item)} style={{ background: 'transparent', border: '1px solid var(--gold-dark)', color: 'var(--gold-bright)', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }}>
                    <i className="fa-solid fa-pen"></i> EDIT
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Inventory;
