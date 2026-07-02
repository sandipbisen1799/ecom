import AdminStatCard from '@/components/admin/AdminStatCard';
import AdminCard from '@/components/admin/AdminCard';

export default function FranchiseDashboardPage() {
  return (
    <div className="content">

      <div className="alert-banner warn">
        <div className="alert-icon"><i className="fa-solid fa-triangle-exclamation" /></div>
        <div className="alert-text">
          <h4>KYC verification pending</h4>
          <p>You have not submitted your KYC documents yet. Please submit them to proceed.</p>
        </div>
      </div>

      <div className="grid-2" style={{ gridTemplateColumns: '1fr 1fr', marginBottom: 20 }}>
        <AdminCard>
          <div className="card-head"><h3>Franchise Profile</h3></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 13, color: 'var(--text)' }}>
            <span><strong>Owner Name:</strong> Auraa</span>
            <span><strong>Business Name:</strong> Auraa Healthcare</span>
            <span><strong>Joining Date:</strong> 2026-02-06</span>
            <span><strong>Pincode:</strong> 226023</span>
          </div>
        </AdminCard>
        <AdminCard>
          <div className="card-head"><h3>Referral Details</h3></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 13, color: 'var(--text)' }}>
            <span><strong>Referral:</strong> 7355205522</span>
            <span><strong>User ID:</strong> AFI13880</span>
          </div>
        </AdminCard>
      </div>

      <div className="stats-row">
        <AdminStatCard icon="fa-lock" value={0} isNumeric={false} displayValue="Pending" label="KYC Status" variant="orange" index={0} />
        <AdminStatCard icon="fa-cart-shopping" value={0} isNumeric={false} displayValue="₹0" label="Total Billing Amount" variant="blue" index={1} />
        <AdminStatCard icon="fa-chart-column" value={0} isNumeric={false} displayValue="₹3,061.90" label="Withdrawal Wallet" variant="green" index={2} />
        <AdminStatCard icon="fa-chart-column" value={0} isNumeric={false} displayValue="₹3,061.90" label="Franchise Commission" variant="orange" index={3} />
        <AdminStatCard icon="fa-indian-rupee-sign" value={0} isNumeric={false} displayValue="₹0" label="Approved Withdrawal" variant="blue" index={4} />
        <AdminStatCard icon="fa-indian-rupee-sign" value={0} isNumeric={false} displayValue="₹0" label="Pending Withdrawal" variant="red" index={5} />
      </div>
    </div>
  );
}