'use client';
import { useState } from 'react';

interface SubAdmin {
  srNo: number;
  name: string;
  userId: string;
  email: string;
  status: boolean;
  date: string;
}

export default function SubAdminPage() {
  const [subAdmins, setSubAdmins] = useState<SubAdmin[]>([
    { srNo: 1, name: 'AURRA USER', userId: 'SAM3500', email: 'test@gmail.com', status: true, date: '2026-02-17' },
    { srNo: 2, name: 'Admin', userId: 'Admin', email: 'test@gmail.com', status: true, date: '2026-01-19' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [entriesCount, setEntriesCount] = useState(10);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'danger'>('success');

  // Form states
  const [name, setName] = useState('');
  const [userIdForm, setUserIdForm] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('123456');
  const [editingSrNo, setEditingSrNo] = useState<number | null>(null);

  const triggerToast = (msg: string, type: 'success' | 'danger' = 'success') => {
    setToastMessage(msg);
    setToastType(type);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleToggleStatus = (srNo: number) => {
    setSubAdmins(prev =>
      prev.map(admin =>
        admin.srNo === srNo ? { ...admin, status: !admin.status } : admin
      )
    );
    triggerToast('Status updated successfully!');
  };

  const handleOpenAddModal = () => {
    setName('');
    setUserIdForm('');
    setEmail('');
    setPassword('123456');
    setShowAddModal(true);
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !userIdForm || !email) {
      triggerToast('Please fill all required fields', 'danger');
      return;
    }

    const newAdmin: SubAdmin = {
      srNo: subAdmins.length > 0 ? Math.max(...subAdmins.map(a => a.srNo)) + 1 : 1,
      name,
      userId: userIdForm,
      email,
      status: true,
      date: new Date().toISOString().split('T')[0]
    };

    setSubAdmins([...subAdmins, newAdmin]);
    setShowAddModal(false);
    triggerToast('Sub Admin added successfully!');
  };

  const handleOpenEditModal = (admin: SubAdmin) => {
    setEditingSrNo(admin.srNo);
    setName(admin.name);
    setUserIdForm(admin.userId);
    setEmail(admin.email);
    setPassword('******');
    setShowEditModal(true);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !userIdForm || !email) {
      triggerToast('Please fill all required fields', 'danger');
      return;
    }

    setSubAdmins(prev =>
      prev.map(admin =>
        admin.srNo === editingSrNo
          ? { ...admin, name, userId: userIdForm, email }
          : admin
      )
    );
    setShowEditModal(false);
    setEditingSrNo(null);
    triggerToast('Sub Admin details updated successfully!');
  };

  const handleDelete = (srNo: number) => {
    if (confirm('Are you sure you want to delete this Sub Admin record?')) {
      setSubAdmins(prev => prev.filter(admin => admin.srNo !== srNo));
      triggerToast('Sub Admin deleted successfully!', 'danger');
    }
  };

  const handleExcelExport = () => {
    triggerToast('📊 Exporting Sub Admin list to Excel...');
  };

  // Filter Logic
  const filteredSubAdmins = subAdmins.filter(admin =>
    admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="content">
      {/* Table Card */}
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginBottom: '18px' }}>
          <button className="btn-primary" onClick={handleOpenAddModal} style={{ background: '#0d6efd', border: 'none', borderRadius: '4px', padding: '8px 16px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
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
                placeholder="Search records..." 
                style={{ padding: '6px 12px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '13px', outline: 'none', background: '#fff' }}
              />
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div style={{ overflowX: 'auto', marginBottom: '16px' }}>
          <table className="data-table" style={{ width: '100%', minWidth: '800px' }}>
            <thead>
              <tr>
                <th>Sr.No <i className="fa-solid fa-sort" style={{ fontSize: '10px', marginLeft: '4px', opacity: 0.5 }}></i></th>
                <th>Name <i className="fa-solid fa-sort" style={{ fontSize: '10px', marginLeft: '4px', opacity: 0.5 }}></i></th>
                <th>User Id <i className="fa-solid fa-sort" style={{ fontSize: '10px', marginLeft: '4px', opacity: 0.5 }}></i></th>
                <th>Email <i className="fa-solid fa-sort" style={{ fontSize: '10px', marginLeft: '4px', opacity: 0.5 }}></i></th>
                <th>Password <i className="fa-solid fa-sort" style={{ fontSize: '10px', marginLeft: '4px', opacity: 0.5 }}></i></th>
                <th>Status <i className="fa-solid fa-sort" style={{ fontSize: '10px', marginLeft: '4px', opacity: 0.5 }}></i></th>
                <th>Date <i className="fa-solid fa-sort" style={{ fontSize: '10px', marginLeft: '4px', opacity: 0.5 }}></i></th>
                <th style={{ textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSubAdmins.slice(0, entriesCount).map((admin, index) => (
                <tr key={admin.srNo}>
                  <td>{index + 1}</td>
                  <td style={{ fontWeight: '500' }}>{admin.name}</td>
                  <td>{admin.userId}</td>
                  <td>{admin.email}</td>
                  <td>******</td>
                  <td>
                    <label className="switch">
                      <input 
                        type="checkbox" 
                        checked={admin.status} 
                        onChange={() => handleToggleStatus(admin.srNo)}
                      />
                      <span className="slider"></span>
                    </label>
                  </td>
                  <td>{admin.date}</td>
                  <td style={{ textAlign: 'center' }}>
                    <button className="btn-action-edit" title="Edit Sub Admin" onClick={() => handleOpenEditModal(admin)}>
                      <i className="fa-solid fa-pen"></i>
                    </button>
                    <button className="btn-action-delete" title="Delete Sub Admin" onClick={() => handleDelete(admin.srNo)}>
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
              {filteredSubAdmins.length === 0 && (
                <tr>
                  <td colSpan={8} style={{ textAlign: 'center', padding: '24px', color: '#888' }}>
                    No matching records found.
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
            Showing 1 to {Math.min(filteredSubAdmins.length, entriesCount)} of {filteredSubAdmins.length} entries
          </div>
          <div className="pagination-btns">
            <button className="pg-btn" disabled>Prev</button>
            <button className="pg-btn active">1</button>
            <button className="pg-btn" disabled>Next</button>
          </div>
        </div>
      </div>

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

      {/* Add Modal */}
      {showAddModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div className="card" style={{ width: '100%', maxWidth: '500px', margin: '20px' }}>
            <div className="card-head" style={{ borderBottom: '1px solid #eee', paddingBottom: '12px', marginBottom: '18px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#333' }}>Add New Sub Admin</h3>
              <button 
                onClick={() => setShowAddModal(false)}
                style={{ background: 'none', border: 'none', fontSize: '18px', color: '#888', cursor: 'pointer' }}
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            <form onSubmit={handleAddSubmit}>
              <div className="form-group">
                <label>Name *</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  placeholder="Enter name"
                  required
                />
              </div>
              <div className="form-group">
                <label>User ID *</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={userIdForm} 
                  onChange={(e) => setUserIdForm(e.target.value)} 
                  placeholder="Enter unique User ID"
                  required
                />
              </div>
              <div className="form-group">
                <label>Email *</label>
                <input 
                  type="email" 
                  className="form-input" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  placeholder="Enter email address"
                  required
                />
              </div>
              <div className="form-group">
                <label>Password *</label>
                <input 
                  type="password" 
                  className="form-input" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  placeholder="Enter password"
                  required
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
                <button type="button" className="btn-outline" onClick={() => setShowAddModal(false)} style={{ padding: '8px 16px', fontSize: '13px' }}>Cancel</button>
                <button type="submit" className="btn-primary" style={{ padding: '8px 16px', fontSize: '13px', background: '#0d6efd', border: 'none' }}>Save Sub Admin</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div className="card" style={{ width: '100%', maxWidth: '500px', margin: '20px' }}>
            <div className="card-head" style={{ borderBottom: '1px solid #eee', paddingBottom: '12px', marginBottom: '18px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#333' }}>Edit Sub Admin Details</h3>
              <button 
                onClick={() => { setShowEditModal(false); setEditingSrNo(null); }}
                style={{ background: 'none', border: 'none', fontSize: '18px', color: '#888', cursor: 'pointer' }}
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            <form onSubmit={handleEditSubmit}>
              <div className="form-group">
                <label>Name *</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  required
                />
              </div>
              <div className="form-group">
                <label>User ID *</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={userIdForm} 
                  onChange={(e) => setUserIdForm(e.target.value)} 
                  required
                />
              </div>
              <div className="form-group">
                <label>Email *</label>
                <input 
                  type="email" 
                  className="form-input" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
                <button type="button" className="btn-outline" onClick={() => { setShowEditModal(false); setEditingSrNo(null); }} style={{ padding: '8px 16px', fontSize: '13px' }}>Cancel</button>
                <button type="submit" className="btn-primary" style={{ padding: '8px 16px', fontSize: '13px', background: '#0d6efd', border: 'none' }}>Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
