'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Franchise {
  srNo: number;
  ownerName: string;
  ownerId: string;
  franchiseName: string;
  sponsorName: string;
  sponsorId: string;
  contact: string;
  commission: number;
  date: string;
  status: boolean;
}

export default function FranchiseListPage() {
  const router = useRouter();
  const [franchises, setFranchises] = useState<Franchise[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [entriesCount, setEntriesCount] = useState(10);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'danger'>('success');

  // Load Seed / LocalStorage
  useEffect(() => {
    const saved = localStorage.getItem('swa_franchises');
    if (saved) {
      setFranchises(JSON.parse(saved));
    } else {
      const defaultFranchises: Franchise[] = [
        { srNo: 1, ownerName: 'Auraa', ownerId: 'AF113880', franchiseName: 'Auraa Healthcare', sponsorName: 'Auraa', sponsorId: '7355205522', contact: '9100000000 / test@gmail.com', commission: 3061.90, date: '06-Feb-2026', status: true },
        { srNo: 2, ownerName: 'Rishikesh', ownerId: 'AF781000', franchiseName: 'Rishabh drug agency', sponsorName: 'Rishikesh', sponsorId: 'A471210', contact: '9100000000 / test@gmail.com', commission: 3061.90, date: '12-Feb-2026', status: true },
        { srNo: 3, ownerName: 'Santosh Thakur', ownerId: 'AF600526', franchiseName: 'Suhani Aurra mobile shopee', sponsorName: 'Santosh Thakur', sponsorId: 'ADMIN', contact: '9100000000 / test@gmail.com', commission: 0.00, date: '17-Mar-2026', status: false },
        { srNo: 4, ownerName: 'Aman kushwaha', ownerId: 'AF691440', franchiseName: 'Aman mobile shopee', sponsorName: 'Aman kushwaha', sponsorId: 'ADMIN', contact: '9100000000 / test@gmail.com', commission: 0.00, date: '17-Mar-2026', status: false },
        { srNo: 5, ownerName: 'Ravindra ji', ownerId: 'AF772253', franchiseName: 'Shiva enterprices', sponsorName: 'Ravindra ji', sponsorId: 'ADMIN', contact: '9100000000 / test@gmail.com', commission: 0.00, date: '17-Mar-2026', status: false }
      ];
      setFranchises(defaultFranchises);
      localStorage.setItem('swa_franchises', JSON.stringify(defaultFranchises));
    }
  }, []);

  const triggerToast = (msg: string, type: 'success' | 'danger' = 'success') => {
    setToastMessage(msg);
    setToastType(type);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleToggleStatus = (srNo: number) => {
    const updated = franchises.map(f => 
      f.srNo === srNo ? { ...f, status: !f.status } : f
    );
    setFranchises(updated);
    localStorage.setItem('swa_franchises', JSON.stringify(updated));
    triggerToast('Franchise status updated successfully!');
  };

  const handleDelete = (srNo: number) => {
    if (confirm('Are you sure you want to delete this Franchise record?')) {
      const updated = franchises.filter(f => f.srNo !== srNo);
      setFranchises(updated);
      localStorage.setItem('swa_franchises', JSON.stringify(updated));
      triggerToast('Franchise deleted successfully!', 'danger');
    }
  };

  const handleExcelExport = () => {
    triggerToast('📊 Exporting Franchise list to Excel...');
  };

  const filteredFranchises = franchises.filter(f => 
    f.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.franchiseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.ownerId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="content">
      {/* Top Header bar matches screenshot exactly */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '18px' }}>
        <button 
          className="btn-primary" 
          onClick={() => router.push('/admin/add-franchise')}
          style={{ background: '#00c0ef', border: 'none', borderRadius: '4px', padding: '8px 16px', fontSize: '13px', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '6px', textTransform: 'uppercase' }}
        >
          <i className="fa-solid fa-plus-circle"></i> Add Franchise
        </button>
      </div>

      <div className="card">
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
                placeholder="Search franchise..." 
                style={{ padding: '6px 12px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '13px', outline: 'none', background: '#fff' }}
              />
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div style={{ overflowX: 'auto', marginBottom: '16px' }}>
          <table className="data-table" style={{ width: '100%', minWidth: '1000px' }}>
            <thead>
              <tr>
                <th>Sr.No <i className="fa-solid fa-sort" style={{ fontSize: '10px', marginLeft: '4px', opacity: 0.5 }}></i></th>
                <th style={{ textAlign: 'center' }}>Owner Name <i className="fa-solid fa-sort" style={{ fontSize: '10px', marginLeft: '4px', opacity: 0.5 }}></i></th>
                <th>Franchise Name <i className="fa-solid fa-sort" style={{ fontSize: '10px', marginLeft: '4px', opacity: 0.5 }}></i></th>
                <th style={{ textAlign: 'center' }}>Sponser Name <i className="fa-solid fa-sort" style={{ fontSize: '10px', marginLeft: '4px', opacity: 0.5 }}></i></th>
                <th>Mobile/Email <i className="fa-solid fa-sort" style={{ fontSize: '10px', marginLeft: '4px', opacity: 0.5 }}></i></th>
                <th>Franchise Commission <i className="fa-solid fa-sort" style={{ fontSize: '10px', marginLeft: '4px', opacity: 0.5 }}></i></th>
                <th>Created At <i className="fa-solid fa-sort" style={{ fontSize: '10px', marginLeft: '4px', opacity: 0.5 }}></i></th>
                <th>Status <i className="fa-solid fa-sort" style={{ fontSize: '10px', marginLeft: '4px', opacity: 0.5 }}></i></th>
                <th style={{ textAlign: 'center' }}>Stock</th>
              </tr>
            </thead>
            <tbody>
              {filteredFranchises.slice(0, entriesCount).map((f, index) => (
                <tr key={f.ownerId}>
                  <td>{index + 1}</td>
                  <td style={{ textAlign: 'center' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <span style={{ fontWeight: '500' }}>{f.ownerName}</span>
                      <span style={{ background: '#00c0ef', color: '#fff', fontSize: '10px', padding: '2px 8px', borderRadius: '3px', fontWeight: 'bold', marginTop: '4px' }}>
                        {f.ownerId}
                      </span>
                    </div>
                  </td>
                  <td style={{ fontWeight: '500' }}>{f.franchiseName}</td>
                  <td style={{ textAlign: 'center' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <span style={{ fontWeight: '500' }}>{f.sponsorName}</span>
                      <span style={{ background: '#00c0ef', color: '#fff', fontSize: '10px', padding: '2px 8px', borderRadius: '3px', fontWeight: 'bold', marginTop: '4px' }}>
                        {f.sponsorId}
                      </span>
                    </div>
                  </td>
                  <td style={{ fontSize: '12.5px', color: '#555' }}>{f.contact}</td>
                  <td style={{ fontWeight: 'bold', color: 'var(--accent)' }}>
                    ₹{f.commission.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </td>
                  <td style={{ fontSize: '13px', color: '#555' }}>{f.date}</td>
                  <td>
                    <label className="switch">
                      <input 
                        type="checkbox" 
                        checked={f.status} 
                        onChange={() => handleToggleStatus(f.srNo)}
                      />
                      <span className="slider"></span>
                    </label>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <button 
                      onClick={() => triggerToast(`📦 Opening stock registry for ${f.franchiseName}...`)}
                      style={{ background: '#00c0ef', color: '#fff', border: 'none', borderRadius: '4px', padding: '6px 12px', fontSize: '12px', cursor: 'pointer', fontWeight: 500 }}
                    >
                      View Stock
                    </button>
                  </td>
                </tr>
              ))}
              {filteredFranchises.length === 0 && (
                <tr>
                  <td colSpan={9} style={{ textAlign: 'center', padding: '24px', color: '#888' }}>
                    No matching franchises found.
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
            Showing 1 to {Math.min(filteredFranchises.length, entriesCount)} of {filteredFranchises.length} entries
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
    </div>
  );
}
