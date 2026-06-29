'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Package {
  id: number;
  name: string;
  price: number;
  pv: number;
  status: boolean;
  date: string;
}

export default function PackageListPage() {
  const router = useRouter();
  const [packages, setPackages] = useState<Package[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [entriesCount, setEntriesCount] = useState(10);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'danger'>('success');
  
  // Edit Modal State
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState('');
  const [editPrice, setEditPrice] = useState(0);
  const [editPv, setEditPv] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem('swa_packages');
    if (saved) {
      setPackages(JSON.parse(saved));
    } else {
      const defaultPackages: Package[] = [
        { id: 1, name: 'Silver Starter Package', price: 1000, pv: 50, status: true, date: '18-Mar-2024' },
        { id: 2, name: 'Gold Business Package', price: 5000, pv: 250, status: true, date: '19-Mar-2024' },
        { id: 3, name: 'Diamond Elite Package', price: 10000, pv: 500, status: true, date: '20-Mar-2024' },
      ];
      setPackages(defaultPackages);
      localStorage.setItem('swa_packages', JSON.stringify(defaultPackages));
    }
  }, []);

  const triggerToast = (msg: string, type: 'success' | 'danger' = 'success') => {
    setToastMessage(msg);
    setToastType(type);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleToggleStatus = (id: number) => {
    const updated = packages.map(p => 
      p.id === id ? { ...p, status: !p.status } : p
    );
    setPackages(updated);
    localStorage.setItem('swa_packages', JSON.stringify(updated));
    triggerToast('Package status updated!');
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this Package?')) {
      const updated = packages.filter(p => p.id !== id);
      setPackages(updated);
      localStorage.setItem('swa_packages', JSON.stringify(updated));
      triggerToast('Package deleted successfully!', 'danger');
    }
  };

  const handleOpenEditModal = (p: Package) => {
    setEditingId(p.id);
    setEditName(p.name);
    setEditPrice(p.price);
    setEditPv(p.pv);
    setShowEditModal(true);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editName || editPrice <= 0 || editPv <= 0) {
      triggerToast('Please fill all fields with valid values', 'danger');
      return;
    }

    const updated = packages.map(p => 
      p.id === editingId ? { ...p, name: editName, price: editPrice, pv: editPv } : p
    );
    setPackages(updated);
    localStorage.setItem('swa_packages', JSON.stringify(updated));

    setShowEditModal(false);
    setEditingId(null);
    triggerToast('Package updated successfully!');
  };

  const handleExcelExport = () => {
    triggerToast('📊 Exporting packages list to Excel...');
  };

  const filteredPackages = packages.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="content">
      <div className="card">
        {/* Top Header Row */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '18px' }}>
          <button 
            className="btn-primary" 
            onClick={() => router.push('/admin/package_detail')}
            style={{ background: '#0d6efd', border: 'none', borderRadius: '4px', padding: '8px 16px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
          >
            <i className="fa-solid fa-plus"></i> Add
          </button>
        </div>

        {/* Filters and search info */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', color: '#555' }}>
            Show 
            <select 
              value={entriesCount} 
              onChange={(e) => setEntriesCount(Number(e.target.value))}
              style={{ padding: '4px 8px', borderRadius: '4px', border: '1px solid #ccc', background: '#fff' }}
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select> 
            entries
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button 
              onClick={handleExcelExport}
              style={{ padding: '6px 14px', border: '1px solid #ccc', borderRadius: '4px', background: '#fff', fontSize: '13px', color: '#333', cursor: 'pointer', fontWeight: 500 }}
            >
              Excel
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '14px', color: '#555' }}>Search:</span>
              <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search packages..." 
                style={{ padding: '6px 12px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '13px', outline: 'none', background: '#fff' }}
              />
            </div>
          </div>
        </div>

        {/* Packages Table */}
        <div style={{ overflowX: 'auto', marginBottom: '16px' }}>
          <table className="data-table" style={{ width: '100%', minWidth: '850px' }}>
            <thead>
              <tr>
                <th>Sr.No <i className="fa-solid fa-sort" style={{ fontSize: '10px', marginLeft: '4px', opacity: 0.5 }}></i></th>
                <th>Package Name <i className="fa-solid fa-sort" style={{ fontSize: '10px', marginLeft: '4px', opacity: 0.5 }}></i></th>
                <th>Price <i className="fa-solid fa-sort" style={{ fontSize: '10px', marginLeft: '4px', opacity: 0.5 }}></i></th>
                <th>PV <i className="fa-solid fa-sort" style={{ fontSize: '10px', marginLeft: '4px', opacity: 0.5 }}></i></th>
                <th>Status <i className="fa-solid fa-sort" style={{ fontSize: '10px', marginLeft: '4px', opacity: 0.5 }}></i></th>
                <th>Created At <i className="fa-solid fa-sort" style={{ fontSize: '10px', marginLeft: '4px', opacity: 0.5 }}></i></th>
                <th style={{ textAlign: 'center' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredPackages.slice(0, entriesCount).map((p, index) => (
                <tr key={p.id}>
                  <td>{index + 1}</td>
                  <td style={{ fontWeight: '500' }}>{p.name}</td>
                  <td style={{ fontWeight: '600', color: 'var(--accent)' }}>₹{p.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                  <td style={{ fontWeight: '500', color: '#0d6efd' }}>{p.pv} PV</td>
                  <td>
                    <label className="switch">
                      <input 
                        type="checkbox" 
                        checked={p.status} 
                        onChange={() => handleToggleStatus(p.id)}
                      />
                      <span className="slider"></span>
                    </label>
                  </td>
                  <td style={{ fontSize: '13px', color: '#666' }}>{p.date}</td>
                  <td style={{ textAlign: 'center' }}>
                    <button className="btn-action-edit" title="Edit Package" onClick={() => handleOpenEditModal(p)}>
                      <i className="fa-solid fa-pen"></i>
                    </button>
                    <button className="btn-action-delete" title="Delete Package" onClick={() => handleDelete(p.id)}>
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
              {filteredPackages.length === 0 && (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', padding: '24px', color: '#888' }}>
                    No matching packages found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Separator line representing scroll track */}
        <div style={{ height: '8px', background: '#ccc', borderRadius: '4px', margin: '14px 0 20px' }}></div>

        {/* Footer info & Pagination */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ fontSize: '13px', color: '#666' }}>
            Showing 1 to {Math.min(filteredPackages.length, entriesCount)} of {filteredPackages.length} entries
          </div>
          <div className="pagination-btns">
            <button className="pg-btn" disabled>Prev</button>
            <button className="pg-btn active">1</button>
            <button className="pg-btn" disabled>Next</button>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div className="card" style={{ width: '100%', maxWidth: '450px', margin: '20px' }}>
            <div className="card-head" style={{ borderBottom: '1px solid #eee', paddingBottom: '12px', marginBottom: '18px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#333' }}>Edit Package Details</h3>
              <button 
                onClick={() => { setShowEditModal(false); setEditingId(null); }}
                style={{ background: 'none', border: 'none', fontSize: '18px', color: '#888', cursor: 'pointer' }}
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            <form onSubmit={handleEditSubmit}>
              <div className="form-group">
                <label>Package Name *</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={editName} 
                  onChange={(e) => setEditName(e.target.value)} 
                  required
                />
              </div>
              <div className="form-group" style={{ marginTop: '12px' }}>
                <label>Price (₹) *</label>
                <input 
                  type="number" 
                  className="form-input" 
                  value={editPrice} 
                  onChange={(e) => setEditPrice(Number(e.target.value))} 
                  required
                />
              </div>
              <div className="form-group" style={{ marginTop: '12px' }}>
                <label>Point Value (PV) *</label>
                <input 
                  type="number" 
                  className="form-input" 
                  value={editPv} 
                  onChange={(e) => setEditPv(Number(e.target.value))} 
                  required
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
                <button type="button" className="btn-outline" onClick={() => { setShowEditModal(false); setEditingId(null); }} style={{ padding: '8px 16px', fontSize: '13px' }}>Cancel</button>
                <button type="submit" className="btn-primary" style={{ padding: '8px 16px', fontSize: '13px', background: 'var(--accent)', border: 'none' }}>Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Toast Alert */}
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
