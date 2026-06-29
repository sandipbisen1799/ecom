'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Product {
  id: number;
  name: string;
  category: string;
  mrp: number;
  stock: number;
  status: boolean;
}

export default function ProductListPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [entriesCount, setEntriesCount] = useState(10);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'danger'>('success');
  
  // Edit Modal State
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState('');
  const [editCategory, setEditCategory] = useState('');
  const [editMrp, setEditMrp] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem('swa_products');
    if (saved) {
      setProducts(JSON.parse(saved));
    } else {
      const defaultProducts: Product[] = [
        { id: 249, name: 'Aurglow Cream', category: 'Skin Care', mrp: 250, stock: 120, status: true },
        { id: 250, name: 'Aurclear Face Serum', category: 'Skin Care', mrp: 320, stock: 80, status: true },
        { id: 251, name: 'Aurglow Face Pack', category: 'Skin Care', mrp: 150, stock: 200, status: true },
        { id: 252, name: 'Aurra Tejas', category: 'Energy & Fitness', mrp: 450, stock: 50, status: true },
        { id: 253, name: 'Aurratri Cream', category: 'Skin Care', mrp: 280, stock: 110, status: true },
        { id: 254, name: 'Aurratri Serum', category: 'Skin Care', mrp: 350, stock: 90, status: true },
        { id: 255, name: 'Aurglow Facewash', category: 'Face Care', mrp: 180, stock: 150, status: true },
        { id: 256, name: 'Aurra Foot Cream', category: 'Face Care', mrp: 160, stock: 70, status: true },
      ];
      setProducts(defaultProducts);
      localStorage.setItem('swa_products', JSON.stringify(defaultProducts));
    }
  }, []);

  const triggerToast = (msg: string, type: 'success' | 'danger' = 'success') => {
    setToastMessage(msg);
    setToastType(type);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleToggleStatus = (id: number) => {
    const updated = products.map(p => 
      p.id === id ? { ...p, status: !p.status } : p
    );
    setProducts(updated);
    localStorage.setItem('swa_products', JSON.stringify(updated));
    triggerToast('Product status updated!');
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this Product?')) {
      const updated = products.filter(p => p.id !== id);
      setProducts(updated);
      localStorage.setItem('swa_products', JSON.stringify(updated));
      triggerToast('Product deleted successfully!', 'danger');
    }
  };

  const handleOpenEditModal = (p: Product) => {
    setEditingId(p.id);
    setEditName(p.name);
    setEditCategory(p.category);
    setEditMrp(p.mrp);
    setShowEditModal(true);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editName || editMrp <= 0) {
      triggerToast('Please fill all required fields', 'danger');
      return;
    }

    const updated = products.map(p => 
      p.id === editingId ? { ...p, name: editName, category: editCategory, mrp: editMrp } : p
    );
    setProducts(updated);
    localStorage.setItem('swa_products', JSON.stringify(updated));

    setShowEditModal(false);
    setEditingId(null);
    triggerToast('Product updated successfully!');
  };

  const handleExcelExport = () => {
    triggerToast('📊 Exporting products catalog to Excel...');
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="content">
      <div className="card">
        {/* Top Header Row */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '18px' }}>
          <button 
            className="btn-primary" 
            onClick={() => router.push('/admin/add-product')}
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
                placeholder="Search products..." 
                style={{ padding: '6px 12px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '13px', outline: 'none', background: '#fff' }}
              />
            </div>
          </div>
        </div>

        {/* Products Table */}
        <div style={{ overflowX: 'auto', marginBottom: '16px' }}>
          <table className="data-table" style={{ width: '100%', minWidth: '850px' }}>
            <thead>
              <tr>
                <th>Sr.No <i className="fa-solid fa-sort" style={{ fontSize: '10px', marginLeft: '4px', opacity: 0.5 }}></i></th>
                <th>Product ID <i className="fa-solid fa-sort" style={{ fontSize: '10px', marginLeft: '4px', opacity: 0.5 }}></i></th>
                <th>Product Name <i className="fa-solid fa-sort" style={{ fontSize: '10px', marginLeft: '4px', opacity: 0.5 }}></i></th>
                <th>Category <i className="fa-solid fa-sort" style={{ fontSize: '10px', marginLeft: '4px', opacity: 0.5 }}></i></th>
                <th>MRP <i className="fa-solid fa-sort" style={{ fontSize: '10px', marginLeft: '4px', opacity: 0.5 }}></i></th>
                <th>Stock <i className="fa-solid fa-sort" style={{ fontSize: '10px', marginLeft: '4px', opacity: 0.5 }}></i></th>
                <th>Status <i className="fa-solid fa-sort" style={{ fontSize: '10px', marginLeft: '4px', opacity: 0.5 }}></i></th>
                <th style={{ textAlign: 'center' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.slice(0, entriesCount).map((p, index) => (
                <tr key={p.id}>
                  <td>{index + 1}</td>
                  <td style={{ color: '#0d6efd', fontWeight: '500' }}>PROD-{p.id}</td>
                  <td style={{ fontWeight: '500' }}>{p.name}</td>
                  <td>{p.category}</td>
                  <td style={{ fontWeight: '600' }}>₹{p.mrp.toFixed(2)}</td>
                  <td style={{ fontWeight: '500', color: p.stock < 20 ? '#dc3545' : '#28a745' }}>{p.stock}</td>
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
                  <td style={{ textAlign: 'center' }}>
                    <button className="btn-action-edit" title="Edit Product" onClick={() => handleOpenEditModal(p)}>
                      <i className="fa-solid fa-pen"></i>
                    </button>
                    <button className="btn-action-delete" title="Delete Product" onClick={() => handleDelete(p.id)}>
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan={8} style={{ textAlign: 'center', padding: '24px', color: '#888' }}>
                    No matching products found.
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
            Showing 1 to {Math.min(filteredProducts.length, entriesCount)} of {filteredProducts.length} entries
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
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#333' }}>Edit Product</h3>
              <button 
                onClick={() => { setShowEditModal(false); setEditingId(null); }}
                style={{ background: 'none', border: 'none', fontSize: '18px', color: '#888', cursor: 'pointer' }}
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            <form onSubmit={handleEditSubmit}>
              <div className="form-group">
                <label>Product Name *</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={editName} 
                  onChange={(e) => setEditName(e.target.value)} 
                  required
                />
              </div>
              <div className="form-group" style={{ marginTop: '12px' }}>
                <label>Category *</label>
                <select 
                  className="form-select" 
                  value={editCategory} 
                  onChange={(e) => setEditCategory(e.target.value)}
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
              <div className="form-group" style={{ marginTop: '12px' }}>
                <label>MRP (₹) *</label>
                <input 
                  type="number" 
                  className="form-input" 
                  value={editMrp} 
                  onChange={(e) => setEditMrp(Number(e.target.value))} 
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
