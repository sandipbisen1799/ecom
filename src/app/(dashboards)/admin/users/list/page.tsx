'use client';
import { useState, useEffect } from 'react';

interface UserItem {
  srNo: number;
  name: string;
  userId: string;
  mobile: string;
  withdrawal: number;
  saving: number;
  packageBv: string;
  sponsor: string;
  createdAt: string;
  status: 'Active' | 'Inactive';
}

export default function UsersListPage({ preFilterStatus }: { preFilterStatus?: 'Active' | 'Inactive' }) {
  const [users, setUsers] = useState<UserItem[]>([]);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [entriesCount, setEntriesCount] = useState(10);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'danger'>('success');

  // Modal State
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserItem | null>(null);

  // Form Edit State
  const [editName, setEditName] = useState('');
  const [editMobile, setEditMobile] = useState('');
  const [editSponsor, setEditSponsor] = useState('');

  // Initial Seed
  useEffect(() => {
    const saved = localStorage.getItem('swa_users');
    if (saved) {
      setUsers(JSON.parse(saved));
    } else {
      const defaultUsers: UserItem[] = [
        { srNo: 1, name: 'AURAA GROUP', userId: 'AHK002', mobile: '9100000000', withdrawal: 832.464, saving: 1985460, packageBv: '1357.07 BV', sponsor: '7355205522', createdAt: '30-Nov-0001', status: 'Active' },
        { srNo: 2, name: 'GONDA BRANCH', userId: 'A113052', mobile: '9100000000', withdrawal: 0, saving: 0, packageBv: '0 BV', sponsor: 'A186661', createdAt: '30-Nov-0001', status: 'Inactive' },
        { srNo: 3, name: 'ABDUL LATIF', userId: 'A113139', mobile: '9100000000', withdrawal: 0, saving: 0, packageBv: '0 BV', sponsor: 'A725102', createdAt: '30-Nov-0001', status: 'Inactive' },
        { srNo: 4, name: 'RAJ KUMAR', userId: 'A113347', mobile: '9100000000', withdrawal: 0, saving: 0, packageBv: '0 BV', sponsor: 'A339524', createdAt: '30-Nov-0001', status: 'Inactive' },
        { srNo: 5, name: 'PRAMOD KUMAR SINGH', userId: 'A114926', mobile: '9100000000', withdrawal: 0, saving: 0, packageBv: '0 BV', sponsor: 'A960447', createdAt: '30-Nov-0001', status: 'Inactive' },
        { srNo: 6, name: 'VIKRAM RAJ', userId: 'A115126', mobile: '9100000000', withdrawal: 0, saving: 0, packageBv: '0 BV', sponsor: 'A950314', createdAt: '30-Nov-0001', status: 'Inactive' },
        { srNo: 7, name: 'MINSHU JAISWAL', userId: 'A115874', mobile: '9100000000', withdrawal: 0, saving: 0, packageBv: '0 BV', sponsor: 'A858436', createdAt: '30-Nov-0001', status: 'Inactive' },
        { srNo: 8, name: 'AURAA GROUP LKO', userId: 'A115962', mobile: '9100000000', withdrawal: 0, saving: 0, packageBv: '0 BV', sponsor: 'A424416', createdAt: '30-Nov-0001', status: 'Active' },
        { srNo: 9, name: 'PRIYANKA SRIVASTAVA', userId: 'A116825', mobile: '9100000000', withdrawal: 0, saving: 0, packageBv: '1.01135 BV', sponsor: 'A439972', createdAt: '30-Nov-0001', status: 'Active' },
        { srNo: 10, name: 'AURAA GROUP', userId: 'A117371', mobile: '9100000000', withdrawal: 0, saving: 0, packageBv: '0 BV', sponsor: 'A894335', createdAt: '30-Nov-0001', status: 'Active' }
      ];
      setUsers(defaultUsers);
      localStorage.setItem('swa_users', JSON.stringify(defaultUsers));
    }
  }, []);

  const triggerToast = (msg: string, type: 'success' | 'danger' = 'success') => {
    setToastMessage(msg);
    setToastType(type);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleStatusChange = (userId: string) => {
    const updated = users.map(u => 
      u.userId === userId 
        ? { ...u, status: (u.status === 'Active' ? 'Inactive' : 'Active') as 'Active' | 'Inactive' }
        : u
    );
    setUsers(updated);
    localStorage.setItem('swa_users', JSON.stringify(updated));
    triggerToast('User status changed successfully!');
  };

  const handleDeleteUser = (userId: string) => {
    if (confirm(`Are you sure you want to delete member ${userId}?`)) {
      const updated = users.filter(u => u.userId !== userId);
      setUsers(updated);
      localStorage.setItem('swa_users', JSON.stringify(updated));
      triggerToast('User deleted from local records.', 'danger');
    }
  };

  const handleOpenEdit = (user: UserItem) => {
    setSelectedUser(user);
    setEditName(user.name);
    setEditMobile(user.mobile);
    setEditSponsor(user.sponsor);
    setShowEditModal(true);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser) return;

    const updated = users.map(u => 
      u.userId === selectedUser.userId 
        ? { ...u, name: editName.toUpperCase(), mobile: editMobile, sponsor: editSponsor }
        : u
    );
    setUsers(updated);
    localStorage.setItem('swa_users', JSON.stringify(updated));
    
    setShowEditModal(false);
    triggerToast('User details updated!');
  };

  const handleOpenView = (user: UserItem) => {
    setSelectedUser(user);
    setShowViewModal(true);
  };

  const handleExcelExport = () => {
    triggerToast('📊 Exporting members database to Excel format...');
  };

  // Filtering
  let displayedUsers = users;
  if (preFilterStatus) {
    displayedUsers = displayedUsers.filter(u => u.status === preFilterStatus);
  }

  const filteredUsers = displayedUsers.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.sponsor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="content">
      {/* Date Filter Bar matches Screenshot 1 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', alignItems: 'center', background: '#fff', padding: '16px 20px', borderRadius: '4px', border: '1px solid #eee', marginBottom: '20px' }}>
        <div>
          <input 
            type="date" 
            className="form-input" 
            placeholder="From Date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            style={{ width: '100%', height: '40px' }}
          />
        </div>
        <div>
          <input 
            type="date" 
            className="form-input" 
            placeholder="To Date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            style={{ width: '100%', height: '40px' }}
          />
        </div>
        <div>
          <button 
            onClick={() => triggerToast('Filtering records by date range...')}
            style={{ width: '100%', height: '40px', background: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 600 }}
          >
            Search
          </button>
        </div>
        <div>
          <button 
            onClick={() => { setFromDate(''); setToDate(''); }}
            style={{ width: '100%', height: '40px', background: '#00c0ef', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 600 }}
          >
            Reset
          </button>
        </div>
      </div>

      <div className="card">
        {/* Entries & Excel & Search bar */}
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
                placeholder="Search user..." 
                style={{ padding: '6px 12px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '13px', outline: 'none', background: '#fff' }}
              />
            </div>
          </div>
        </div>

        {/* Directory Table */}
        <div style={{ overflowX: 'auto', marginBottom: '16px' }}>
          <table className="data-table" style={{ width: '100%', minWidth: '1100px' }}>
            <thead>
              <tr>
                <th>Sr.No <i className="fa-solid fa-sort" style={{ fontSize: '10px', marginLeft: '4px', opacity: 0.5 }}></i></th>
                <th>Name <i className="fa-solid fa-sort" style={{ fontSize: '10px', marginLeft: '4px', opacity: 0.5 }}></i></th>
                <th>UserId <i className="fa-solid fa-sort" style={{ fontSize: '10px', marginLeft: '4px', opacity: 0.5 }}></i></th>
                <th>Mobile No. <i className="fa-solid fa-sort" style={{ fontSize: '10px', marginLeft: '4px', opacity: 0.5 }}></i></th>
                <th>Withdrawl Wallet <i className="fa-solid fa-sort" style={{ fontSize: '10px', marginLeft: '4px', opacity: 0.5 }}></i></th>
                <th>Saving Wallet <i className="fa-solid fa-sort" style={{ fontSize: '10px', marginLeft: '4px', opacity: 0.5 }}></i></th>
                <th>Package <i className="fa-solid fa-sort" style={{ fontSize: '10px', marginLeft: '4px', opacity: 0.5 }}></i></th>
                <th>Sponser <i className="fa-solid fa-sort" style={{ fontSize: '10px', marginLeft: '4px', opacity: 0.5 }}></i></th>
                <th>Created At <i className="fa-solid fa-sort" style={{ fontSize: '10px', marginLeft: '4px', opacity: 0.5 }}></i></th>
                <th>Status <i className="fa-solid fa-sort" style={{ fontSize: '10px', marginLeft: '4px', opacity: 0.5 }}></i></th>
                <th style={{ textAlign: 'center' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.slice(0, entriesCount).map((u, index) => (
                <tr key={u.userId}>
                  <td>{index + 1}</td>
                  <td style={{ fontWeight: 'bold', color: '#333' }}>{u.name}</td>
                  <td>
                    <span style={{ background: '#28a745', color: '#fff', fontSize: '11px', padding: '3px 8px', borderRadius: '4px', fontWeight: 'bold' }}>
                      {u.userId}
                    </span>
                  </td>
                  <td>{u.mobile}</td>
                  <td style={{ fontWeight: '500' }}>₹{u.withdrawal.toFixed(3)}</td>
                  <td style={{ fontWeight: '500' }}>₹{u.saving.toLocaleString('en-IN')}</td>
                  <td style={{ fontWeight: '500', color: '#0d6efd' }}>{u.packageBv}</td>
                  <td style={{ color: '#555', fontWeight: '500' }}>{u.sponsor}</td>
                  <td style={{ fontSize: '13px', color: '#666' }}>{u.createdAt}</td>
                  <td>
                    <span 
                      onClick={() => handleStatusChange(u.userId)}
                      style={{ 
                        color: u.status === 'Active' ? '#28a745' : '#dc3545', 
                        fontWeight: 'bold', 
                        fontSize: '13px', 
                        cursor: 'pointer' 
                      }}
                    >
                      {u.status}
                    </span>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <button className="btn-action-edit" title="Edit User" onClick={() => handleOpenEdit(u)}>
                      <i className="fa-solid fa-pen"></i>
                    </button>
                    <button 
                      className="btn-action-edit" 
                      title="View Details" 
                      onClick={() => handleOpenView(u)}
                      style={{ background: '#17a2b8', color: '#fff', marginLeft: '4px' }}
                    >
                      <i className="fa-solid fa-eye"></i>
                    </button>
                    <button 
                      className="btn-action-delete" 
                      title="Delete User" 
                      onClick={() => handleDeleteUser(u.userId)}
                      style={{ marginLeft: '4px' }}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan={11} style={{ textAlign: 'center', padding: '24px', color: '#888' }}>
                    No users matching query were found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Separator line representing scroll track */}
        <div style={{ height: '8px', background: '#ccc', borderRadius: '4px', margin: '14px 0 20px' }}></div>

        {/* Footer info & Pagination matching screenshot indices */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ fontSize: '13px', color: '#666' }}>
            Showing 1 to {Math.min(filteredUsers.length, entriesCount)} of 1,851 entries (seeded: {filteredUsers.length})
          </div>
          <div className="pagination-btns">
            <button className="pg-btn" disabled>Prev</button>
            <button className="pg-btn active">1</button>
            <button className="pg-btn">2</button>
            <button className="pg-btn">3</button>
            <button className="pg-btn">4</button>
            <button className="pg-btn">5</button>
            <span style={{ padding: '0 8px', color: '#888' }}>...</span>
            <button className="pg-btn">186</button>
            <button className="pg-btn">Next</button>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && selectedUser && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div className="card" style={{ width: '100%', maxWidth: '450px', margin: '20px' }}>
            <div className="card-head" style={{ borderBottom: '1px solid #eee', paddingBottom: '12px', marginBottom: '18px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#333' }}>Edit Member Profile</h3>
              <button onClick={() => setShowEditModal(false)} style={{ background: 'none', border: 'none', fontSize: '18px', color: '#888', cursor: 'pointer' }}>
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            <form onSubmit={handleEditSubmit}>
              <div className="form-group">
                <label>Member Name *</label>
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
                <label>Sponsor ID *</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={editSponsor} 
                  onChange={(e) => setEditSponsor(e.target.value)} 
                  required
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

      {/* View Modal */}
      {showViewModal && selectedUser && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div className="card" style={{ width: '100%', maxWidth: '500px', margin: '20px' }}>
            <div className="card-head" style={{ borderBottom: '1px solid #eee', paddingBottom: '12px', marginBottom: '18px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#333' }}>Member Details Profile</h3>
              <button onClick={() => setShowViewModal(false)} style={{ background: 'none', border: 'none', fontSize: '18px', color: '#888', cursor: 'pointer' }}>
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px', color: '#444' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f9f9f9', paddingBottom: '6px' }}>
                <strong>Member Name:</strong>
                <span>{selectedUser.name}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f9f9f9', paddingBottom: '6px' }}>
                <strong>User ID:</strong>
                <span style={{ color: '#28a745', fontWeight: 'bold' }}>{selectedUser.userId}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f9f9f9', paddingBottom: '6px' }}>
                <strong>Mobile Number:</strong>
                <span>{selectedUser.mobile}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f9f9f9', paddingBottom: '6px' }}>
                <strong>Withdrawal Wallet:</strong>
                <span style={{ fontWeight: 'bold', color: 'var(--accent)' }}>₹{selectedUser.withdrawal.toFixed(3)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f9f9f9', paddingBottom: '6px' }}>
                <strong>Saving Wallet:</strong>
                <span style={{ fontWeight: 'bold', color: '#28a745' }}>₹{selectedUser.saving.toLocaleString('en-IN')}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f9f9f9', paddingBottom: '6px' }}>
                <strong>Package Value:</strong>
                <span>{selectedUser.packageBv}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f9f9f9', paddingBottom: '6px' }}>
                <strong>Sponsor ID:</strong>
                <span>{selectedUser.sponsor}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f9f9f9', paddingBottom: '6px' }}>
                <strong>Registration Date:</strong>
                <span>{selectedUser.createdAt}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <strong>Account Status:</strong>
                <span style={{ color: selectedUser.status === 'Active' ? '#28a745' : '#dc3545', fontWeight: 'bold' }}>{selectedUser.status}</span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px' }}>
              <button className="btn-primary" onClick={() => setShowViewModal(false)} style={{ padding: '8px 24px', fontSize: '13px', background: 'var(--accent)', border: 'none' }}>Close Profile</button>
            </div>
          </div>
        </div>
      )}

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
