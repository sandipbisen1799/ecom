'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Category {
  srNo: number;
  name: string;
  date: string;
  timestamp: string;
  status: boolean;
  image: string;
}

export default function CategoryListPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [entriesCount, setEntriesCount] = useState(10);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'danger'>('success');
  
  // Edit Modal State
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingSrNo, setEditingSrNo] = useState<number | null>(null);
  const [editName, setEditName] = useState('');

  useEffect(() => {
    // Load categories from localStorage or initialize defaults
    const saved = localStorage.getItem('swa_categories');
    if (saved) {
      setCategories(JSON.parse(saved));
    } else {
      const defaultCategories: Category[] = [
        { srNo: 1, name: 'Skin Care', date: '18-Mar-2024', timestamp: '2024-03-18 05:05:07', status: true, image: '🌸' },
        { srNo: 2, name: 'Hair Care', date: '18-Mar-2024', timestamp: '2024-03-18 05:05:51', status: true, image: '🌿' },
        { srNo: 3, name: 'Energy & Fitness', date: '25-Mar-2024', timestamp: '2024-03-25 15:38:09', status: true, image: '🥤' },
        { srNo: 4, name: 'Ayurveda', date: '09-Sep-2024', timestamp: '2024-09-09 05:09:31', status: true, image: '🍯' },
        { srNo: 5, name: 'Face Care', date: '07-Nov-2025', timestamp: '2025-11-07 11:26:38', status: true, image: '🧴' },
      ];
      setCategories(defaultCategories);
      localStorage.setItem('swa_categories', JSON.stringify(defaultCategories));
    }
  }, []);

  const triggerToast = (msg: string, type: 'success' | 'danger' = 'success') => {
    setToastMessage(msg);
    setToastType(type);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleToggleStatus = (srNo: number) => {
    const updated = categories.map(cat => 
      cat.srNo === srNo ? { ...cat, status: !cat.status } : cat
    );
    setCategories(updated);
    localStorage.setItem('swa_categories', JSON.stringify(updated));
    triggerToast('Status updated successfully!');
  };

  const handleDelete = (srNo: number) => {
    if (confirm('Are you sure you want to delete this Category?')) {
      const updated = categories.filter(cat => cat.srNo !== srNo);
      setCategories(updated);
      localStorage.setItem('swa_categories', JSON.stringify(updated));
      triggerToast('Category deleted successfully!', 'danger');
    }
  };

  const handleOpenEditModal = (cat: Category) => {
    setEditingSrNo(cat.srNo);
    setEditName(cat.name);
    setShowEditModal(true);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editName) {
      triggerToast('Category name cannot be empty!', 'danger');
      return;
    }

    const updated = categories.map(cat => 
      cat.srNo === editingSrNo ? { ...cat, name: editName } : cat
    );
    setCategories(updated);
    localStorage.setItem('swa_categories', JSON.stringify(updated));
    
    setShowEditModal(false);
    setEditingSrNo(null);
    triggerToast('Category updated successfully!');
  };

  const handleExcelExport = () => {
    triggerToast('📊 Exporting categories list to Excel...');
  };

  const filteredCategories = categories.filter(cat => 
    cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cat.date.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="content">
      <div className="card">
        {/* Top Add Button */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '18px' }}>
          <button 
            className="btn-primary" 
            onClick={() => router.push('/admin/add-category')}
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
                placeholder="Search categories..." 
                style={{ padding: '6px 12px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '13px', outline: 'none', background: '#fff' }}
              />
            </div>
          </div>
        </div>

        {/* Categories Table */}
        <div style={{ overflowX: 'auto', marginBottom: '16px' }}>
          <table className="data-table" style={{ width: '100%', minWidth: '700px' }}>
            <thead>
              <tr>
                <th>Sr.No <i className="fa-solid fa-sort" style={{ fontSize: '10px', marginLeft: '4px', opacity: 0.5 }}></i></th>
                <th>Category Image <i className="fa-solid fa-sort" style={{ fontSize: '10px', marginLeft: '4px', opacity: 0.5 }}></i></th>
                <th>Category Name <i className="fa-solid fa-sort" style={{ fontSize: '10px', marginLeft: '4px', opacity: 0.5 }}></i></th>
                <th>Created At <i className="fa-solid fa-sort" style={{ fontSize: '10px', marginLeft: '4px', opacity: 0.5 }}></i></th>
                <th>Status <i className="fa-solid fa-sort" style={{ fontSize: '10px', marginLeft: '4px', opacity: 0.5 }}></i></th>
                <th style={{ textAlign: 'center' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredCategories.slice(0, entriesCount).map((cat, index) => (
                <tr key={cat.srNo}>
                  <td>{index + 1}</td>
                  <td>
                    {cat.image.startsWith('blob:') || cat.image.startsWith('http') ? (
                      <img 
                        src={cat.image} 
                        alt={cat.name} 
                        style={{ width: '38px', height: '38px', borderRadius: '6px', objectFit: 'contain', border: '1px solid #eee' }} 
                      />
                    ) : (
                      <div className="product-thumb" style={{ width: '38px', height: '38px', fontSize: '18px' }}>
                        {cat.image}
                      </div>
                    )}
                  </td>
                  <td style={{ fontWeight: '500' }}>{cat.name}</td>
                  <td style={{ color: '#555' }}>
                    <div>{cat.date}</div>
                    <small style={{ fontSize: '11px', color: '#888' }}>{cat.timestamp}</small>
                  </td>
                  <td>
                    <label className="switch">
                      <input 
                        type="checkbox" 
                        checked={cat.status} 
                        onChange={() => handleToggleStatus(cat.srNo)}
                      />
                      <span className="slider"></span>
                    </label>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <button className="btn-action-edit" title="Edit Category" onClick={() => handleOpenEditModal(cat)}>
                      <i className="fa-solid fa-pen"></i>
                    </button>
                    <button className="btn-action-delete" title="Delete Category" onClick={() => handleDelete(cat.srNo)}>
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
              {filteredCategories.length === 0 && (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '24px', color: '#888' }}>
                    No matching categories found.
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
            Showing 1 to {Math.min(filteredCategories.length, entriesCount)} of {filteredCategories.length} entries
          </div>
          <div className="pagination-btns">
            <button className="pg-btn" disabled>Prev</button>
            <button className="pg-btn active">1</button>
            <button className="pg-btn" disabled>Next</button>
          </div>
        </div>
      </div>

      {/* Edit Category Modal */}
      {showEditModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div className="card" style={{ width: '100%', maxWidth: '450px', margin: '20px' }}>
            <div className="card-head" style={{ borderBottom: '1px solid #eee', paddingBottom: '12px', marginBottom: '18px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#333' }}>Edit Category</h3>
              <button 
                onClick={() => { setShowEditModal(false); setEditingSrNo(null); }}
                style={{ background: 'none', border: 'none', fontSize: '18px', color: '#888', cursor: 'pointer' }}
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            <form onSubmit={handleEditSubmit}>
              <div className="form-group">
                <label>Category Name *</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={editName} 
                  onChange={(e) => setEditName(e.target.value)} 
                  required
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
                <button type="button" className="btn-outline" onClick={() => { setShowEditModal(false); setEditingSrNo(null); }} style={{ padding: '8px 16px', fontSize: '13px' }}>Cancel</button>
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
