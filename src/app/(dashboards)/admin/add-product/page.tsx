'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddProductPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Skin Care');
  const [mrp, setMrp] = useState(0);
  const [stock, setStock] = useState(100);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'danger'>('success');

  const triggerToast = (msg: string, type: 'success' | 'danger' = 'success') => {
    setToastMessage(msg);
    setToastType(type);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || mrp <= 0) {
      triggerToast('Please fill all fields with valid values', 'danger');
      return;
    }

    const saved = localStorage.getItem('swa_products');
    let productsList = [];
    if (saved) {
      productsList = JSON.parse(saved);
    } else {
      productsList = [
        { id: 249, name: 'Aurglow Cream', category: 'Skin Care', mrp: 250, stock: 120, status: true },
        { id: 250, name: 'Aurclear Face Serum', category: 'Skin Care', mrp: 320, stock: 80, status: true },
        { id: 251, name: 'Aurglow Face Pack', category: 'Skin Care', mrp: 150, stock: 200, status: true },
        { id: 252, name: 'Aurra Tejas', category: 'Energy & Fitness', mrp: 450, stock: 50, status: true },
        { id: 253, name: 'Aurratri Cream', category: 'Skin Care', mrp: 280, stock: 110, status: true },
        { id: 254, name: 'Aurratri Serum', category: 'Skin Care', mrp: 350, stock: 90, status: true },
        { id: 255, name: 'Aurglow Facewash', category: 'Face Care', mrp: 180, stock: 150, status: true },
        { id: 256, name: 'Aurra Foot Cream', category: 'Face Care', mrp: 160, stock: 70, status: true },
      ];
    }

    const nextId = productsList.length > 0 ? Math.max(...productsList.map((p: any) => p.id)) + 1 : 249;
    
    const newProduct = {
      id: nextId,
      name,
      category,
      mrp,
      stock,
      status: true
    };

    productsList.push(newProduct);
    localStorage.setItem('swa_products', JSON.stringify(productsList));

    triggerToast('Product added successfully!');
    setTimeout(() => {
      router.push('/admin/product-list');
    }, 800);
  };

  return (
    <div className="content">
      <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div className="card-head" style={{ borderBottom: '1px solid #eee', paddingBottom: '12px', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#333' }}>Add Product</h3>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Name Input */}
          <div className="form-group">
            <label className="form-label" style={{ fontWeight: '600', color: '#555' }}>Product Name *</label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="Enter product name"
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required
            />
          </div>

          {/* Category Dropdown */}
          <div className="form-group" style={{ marginTop: '16px' }}>
            <label className="form-label" style={{ fontWeight: '600', color: '#555' }}>Category *</label>
            <select 
              className="form-select" 
              value={category} 
              onChange={(e) => setCategory(e.target.value)}
              style={{ width: '100%', padding: '10px 14px', border: '1px solid #ccc', borderRadius: '4px', background: '#fff' }}
              required
            >
              <option value="Skin Care">Skin Care</option>
              <option value="Hair Care">Hair Care</option>
              <option value="Energy & Fitness">Energy & Fitness</option>
              <option value="Ayurveda">Ayurveda</option>
              <option value="Face Care">Face Care</option>
            </select>
          </div>

          {/* MRP & Stock row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '16px' }}>
            <div className="form-group">
              <label className="form-label" style={{ fontWeight: '600', color: '#555' }}>MRP (₹) *</label>
              <input 
                type="number" 
                className="form-input" 
                value={mrp || ''} 
                onChange={(e) => setMrp(Number(e.target.value))} 
                min="1"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label" style={{ fontWeight: '600', color: '#555' }}>Opening Stock *</label>
              <input 
                type="number" 
                className="form-input" 
                value={stock || ''} 
                onChange={(e) => setStock(Number(e.target.value))} 
                min="0"
                required
              />
            </div>
          </div>

          {/* Action buttons */}
          <div style={{ marginTop: '28px', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            <button 
              type="button" 
              className="btn-outline" 
              onClick={() => router.push('/admin/product-list')}
              style={{ padding: '8px 20px', fontSize: '13px' }}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn-primary" 
              style={{ padding: '8px 24px', fontSize: '13px', background: 'var(--accent)', border: 'none' }}
            >
              Submit Product
            </button>
          </div>
        </form>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div 
          style={{ 
            position: 'fixed', 
            bottom: '24px', 
            right: '24px', 
            background: toastType === 'success' ? '#28a745' : '#dc3545', 
            color: '#fff', 
            padding: '12px 24px', 
            borderRadius: '4px', 
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            zIndex: 9999,
            fontSize: '14px',
            fontWeight: 500,
            transition: 'opacity 0.3s'
          }}
        >
          {toastMessage}
        </div>
      )}
    </div>
  );
}
