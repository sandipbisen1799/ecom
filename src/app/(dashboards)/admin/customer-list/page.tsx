'use client';
import { useState, useEffect } from 'react';

interface CustomerItem {
  srNo: number;
  name: string;
  userId: string;
  email: string;
  mobile: string;
  address: string;
  createdAt: string;
}

export default function CustomerListPage() {
  const [customers, setCustomers] = useState<CustomerItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [entriesCount, setEntriesCount] = useState(10);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'danger'>('success');

  // Edit Modal State
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerItem | null>(null);
  const [editName, setEditName] = useState('');
  const [editMobile, setEditMobile] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editAddress, setEditAddress] = useState('');

  // Initial Seed
  useEffect(() => {
    const saved = localStorage.getItem('swa_customers');
    if (saved) {
      setCustomers(JSON.parse(saved));
    } else {
      const defaultCustomers: CustomerItem[] = [
        { srNo: 1, name: 'nomo ramses niangbe', userId: 'AH63693', email: 'nomoramses@gmail.com', mobile: '0708287904', address: '', createdAt: '06-May-2026' },
        { srNo: 2, name: 'nomo ramses niangb', userId: 'AH32217', email: 'nomoramses@gmail.com', mobile: '0153783705', address: '', createdAt: '06-May-2026' },
        { srNo: 3, name: 'SWATI DAS', userId: 'AH55705', email: 'test@gmail.com', mobile: '9100000000', address: '', createdAt: '07-Mar-2026' },
        { srNo: 4, name: 'manik gupta', userId: 'AHK68841', email: 'test@gmail.com', mobile: '9100000000', address: 'LUCKNOW', createdAt: '23-Jan-2026' },
        { srNo: 5, name: 'faiz abbas', userId: 'AHK24220', email: 'test@gmail.com', mobile: '9100000000', address: 'LUCKNOW', createdAt: '23-Jan-2026' }
      ];
      setCustomers(defaultCustomers);
      localStorage.setItem('swa_customers', JSON.stringify(defaultCustomers));
    }
  }, []);

  const triggerToast = (msg: string, type: 'success' | 'danger' = 'success') => {
    setToastMessage(msg);
    setToastType(type);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleOpenEdit = (customer: CustomerItem) => {
    setSelectedCustomer(customer);
    setEditName(customer.name);
    setEditMobile(customer.mobile);
    setEditEmail(customer.email);
    setEditAddress(customer.address);
    setShowEditModal(true);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCustomer) return;

    const updated = customers.map(c => 
      c.userId === selectedCustomer.userId 
        ? { ...c, name: editName, mobile: editMobile, email: editEmail, address: editAddress }
        : c
    );
    setCustomers(updated);
    localStorage.setItem('swa_customers', JSON.stringify(updated));
    
    setShowEditModal(false);
    triggerToast('Customer details updated successfully!');
  };

  const handleExcelExport = () => {
    triggerToast('📊 Exporting customer listing to Excel format...');
  };

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="content">
      <div className="card">
        {/* Entries & Search row */}
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
                placeholder="Search customers..." 
                style={{ padding: '6px 12px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '13px', outline: 'none', background: '#fff' }}
              />
            </div>
          </div>
        </div>

        {/* Customer Directory Table */}
        <div style={{ overflowX: 'auto', marginBottom: '16px' }}>
          <table className="data-table" style={{ width: '100%', minWidth: '950px' }}>
            <thead>
              <tr>
                <th>Sr.No <i className="fa-solid fa-sort" style={{ fontSize: '10px', marginLeft: '4px', opacity: 0.5 }}></i></th>
                <th>Name <i className="fa-solid fa-sort" style={{ fontSize: '10px', marginLeft: '4px', opacity: 0.5 }}></i></th>
                <th>UserId <i className="fa-solid fa-sort" style={{ fontSize: '10px', marginLeft: '4px', opacity: 0.5 }}></i></th>
                <th>Email <i className="fa-solid fa-sort" style={{ fontSize: '10px', marginLeft: '4px', opacity: 0.5 }}></i></th>
                <th>Mobile No. <i className="fa-solid fa-sort" style={{ fontSize: '10px', marginLeft: '4px', opacity: 0.5 }}></i></th>
                <th>Address <i className="fa-solid fa-sort" style={{ fontSize: '10px', marginLeft: '4px', opacity: 0.5 }}></i></th>
                <th>Created At <i className="fa-solid fa-sort" style={{ fontSize: '10px', marginLeft: '4px', opacity: 0.5 }}></i></th>
                <th style={{ textAlign: 'center' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.slice(0, entriesCount).map((c, index) => (
                <tr key={c.userId}>
                  <td>{index + 1}</td>
                  <td style={{ fontWeight: '500' }}>{c.name}</td>
                  <td>
                    <span style={{ background: '#28a745', color: '#fff', fontSize: '11px', padding: '3px 8px', borderRadius: '4px', fontWeight: 'bold' }}>
                      {c.userId}
                    </span>
                  </td>
                  <td>{c.email}</td>
                  <td>{c.mobile}</td>
                  <td>{c.address || '—'}</td>
                  <td style={{ fontSize: '13px', color: '#666' }}>{c.createdAt}</td>
                  <td style={{ textAlign: 'center' }}>
                    <button className="btn-action-edit" title="Edit Customer" onClick={() => handleOpenEdit(c)}>
                      <i className="fa-solid fa-pen"></i>
                    </button>
                  </td>
                </tr>
              ))}
              {filteredCustomers.length === 0 && (
                <tr>
                  <td colSpan={8} style={{ textAlign: 'center', padding: '24px', color: '#888' }}>
                    No matching customers found.
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
            Showing 1 to {Math.min(filteredCustomers.length, entriesCount)} of {filteredCustomers.length} entries
          </div>
          <div className="pagination-btns">
            <button className="pg-btn" disabled>Prev</button>
            <button className="pg-btn active">1</button>
            <button className="pg-btn" disabled>Next</button>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showEditModal && selectedCustomer && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div className="card" style={{ width: '100%', maxWidth: '450px', margin: '20px' }}>
            <div className="card-head" style={{ borderBottom: '1px solid #eee', paddingBottom: '12px', marginBottom: '18px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#333' }}>Edit Customer Details</h3>
              <button onClick={() => setShowEditModal(false)} style={{ background: 'none', border: 'none', fontSize: '18px', color: '#888', cursor: 'pointer' }}>
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            <form onSubmit={handleEditSubmit}>
              <div className="form-group">
                <label>Customer Name *</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={editName} 
                  onChange={(e) => setEditName(e.target.value)} 
                  required
                />
              </div>
              <div className="form-group" style={{ marginTop: '12px' }}>
                <label>Mobile Number *</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={editMobile} 
                  onChange={(e) => setEditMobile(e.target.value)} 
                  required
                />
              </div>
              <div className="form-group" style={{ marginTop: '12px' }}>
                <label>Email *</label>
                <input 
                  type="email" 
                  className="form-input" 
                  value={editEmail} 
                  onChange={(e) => setEditEmail(e.target.value)} 
                  required
                />
              </div>
              <div className="form-group" style={{ marginTop: '12px' }}>
                <label>Address</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={editAddress} 
                  onChange={(e) => setEditAddress(e.target.value)} 
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
                <button type="button" className="btn-outline" onClick={() => setShowEditModal(false)} style={{ padding: '8px 16px', fontSize: '13px' }}>Cancel</button>
                <button type="submit" className="btn-primary" style={{ padding: '8px 16px', fontSize: '13px', background: 'var(--accent)', border: 'none' }}>Save Details</button>
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
