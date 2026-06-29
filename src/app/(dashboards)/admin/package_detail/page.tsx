'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddPackagePage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [price, setPrice] = useState(1000);
  const [pv, setPv] = useState(50);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'danger'>('success');

  const triggerToast = (msg: string, type: 'success' | 'danger' = 'success') => {
    setToastMessage(msg);
    setToastType(type);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || price <= 0 || pv <= 0) {
      triggerToast('Please fill all fields with valid values', 'danger');
      return;
    }

    const saved = localStorage.getItem('swa_packages');
    let packagesList = [];
    if (saved) {
      packagesList = JSON.parse(saved);
    } else {
      packagesList = [
        { id: 1, name: 'Silver Starter Package', price: 1000, pv: 50, status: true, date: '18-Mar-2024' },
        { id: 2, name: 'Gold Business Package', price: 5000, pv: 250, status: true, date: '19-Mar-2024' },
        { id: 3, name: 'Diamond Elite Package', price: 10000, pv: 500, status: true, date: '20-Mar-2024' },
      ];
    }

    const nextId = packagesList.length > 0 ? Math.max(...packagesList.map((p: any) => p.id)) + 1 : 1;
    
    const newPackage = {
      id: nextId,
      name,
      price,
      pv,
      status: true,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, '-')
    };

    packagesList.push(newPackage);
    localStorage.setItem('swa_packages', JSON.stringify(packagesList));

    triggerToast('Package added successfully!');
    setTimeout(() => {
      router.push('/admin/package_list');
    }, 800);
  };

  return (
    <div className="content">
      <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div className="card-head" style={{ borderBottom: '1px solid #eee', paddingBottom: '12px', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#333' }}>Add Package</h3>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Name Input */}
          <div className="form-group">
            <label className="form-label" style={{ fontWeight: '600', color: '#555' }}>Package Name *</label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="Enter package name"
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required
            />
          </div>

          {/* Price & PV row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '16px' }}>
            <div className="form-group">
              <label className="form-label" style={{ fontWeight: '600', color: '#555' }}>Price (₹) *</label>
              <input 
                type="number" 
                className="form-input" 
                value={price || ''} 
                onChange={(e) => setPrice(Number(e.target.value))} 
                min="1"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label" style={{ fontWeight: '600', color: '#555' }}>Point Value (PV) *</label>
              <input 
                type="number" 
                className="form-input" 
                value={pv || ''} 
                onChange={(e) => setPv(Number(e.target.value))} 
                min="1"
                required
              />
            </div>
          </div>

          {/* Action buttons */}
          <div style={{ marginTop: '28px', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            <button 
              type="button" 
              className="btn-outline" 
              onClick={() => router.push('/admin/package_list')}
              style={{ padding: '8px 20px', fontSize: '13px' }}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn-primary" 
              style={{ padding: '8px 24px', fontSize: '13px', background: 'var(--accent)', border: 'none' }}
            >
              Submit Package
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
