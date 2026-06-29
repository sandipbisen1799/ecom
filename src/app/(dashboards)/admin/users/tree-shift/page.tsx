'use client';

export default function UserTreeShiftPage() {
  return (
    <div className="content">
      <div className="card">
        <div className="card-head" style={{ borderBottom: '1px solid #eee', paddingBottom: '12px', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#333' }}>Tree Shift Management</h3>
        </div>
        <div style={{ padding: '24px', textAlign: 'center', color: '#666' }}>
          <i className="fa-solid fa-network-wired" style={{ fontSize: '48px', color: '#ccc', marginBottom: '16px' }}></i>
          <p style={{ margin: 0, fontSize: '15px' }}>Tree restructuring shifts are currently locked. No active requests.</p>
        </div>
      </div>
    </div>
  );
}
