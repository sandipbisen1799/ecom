'use client';
import { useState } from 'react';
import Link from 'next/link';
import '../dashboards.css';

export default function FranchiseLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <style>{`
        :root {
          --sidebar: #2c1e16;
          --accent: #f59e0b;
          --accent2: #fcd34d;
          --green: #22c55e;
          --blue: #3b82f6;
          --red: #ef4444;
          --card: #fff;
          --bg: #f9f9f9;
          --text: #1a1a2e;
          --muted: #6b7280;
          --border: #e5e7eb;
        }
        .user-chip { display: flex; align-items: center; gap: 7px; background: linear-gradient(135deg, var(--accent), #d97706); padding: 5px 12px; border-radius: 8px; cursor: pointer; }
        .user-chip span { font-size: 12px; font-weight: 600; color: #fff; }
        
        .inv-warn { background: #fffbeb; border: 1px solid #fde68a; border-radius: 12px; padding: 16px; margin-bottom: 24px; display: flex; align-items: center; gap: 14px; }
        .inv-icon { width: 40px; height: 40px; background: #fef3c7; color: #d97706; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0; }
        .inv-text h4 { font-size: 13px; font-weight: 700; color: #b45309; margin: 0 0 2px; }
        .inv-text p { font-size: 12px; color: #92400e; margin: 0; }
        
        .pill { display: inline-block; padding: 3px 9px; border-radius: 20px; font-size: 11px; font-weight: 600; }
        .p-green  { background: #dcfce7; color: #16a34a; }
        .p-yellow { background: #fef9c3; color: #ca8a04; }
        .p-red    { background: #fee2e2; color: #dc2626; }
      `}</style>

      <button className="mob-toggle" onClick={toggleSidebar}><i className="fa-solid fa-bars"></i></button>
      <div className={`overlay-bg ${sidebarOpen ? 'show' : ''}`} onClick={toggleSidebar}></div>

      {/* SIDEBAR */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-logo">
          <div className="logo-circle">🏪</div>
          <div className="logo-text">
            <h3>Aurra Health Kart</h3>
            <span>Franchise Panel</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-section-label">Main</div>
          <Link href="/franchise" className="nav-item active"><i className="fa-solid fa-gauge"></i> Dashboard</Link>
          <Link href="#" className="nav-item"><i className="fa-solid fa-boxes-stacked"></i> Inventory</Link>
          <Link href="#" className="nav-item"><i className="fa-solid fa-cart-arrow-down"></i> Local Orders <span className="nav-badge">4</span></Link>
          <Link href="#" className="nav-item"><i className="fa-solid fa-users"></i> Walk-in Billing</Link>
          <div className="nav-section-label">Finance</div>
          <Link href="#" className="nav-item"><i className="fa-solid fa-wallet"></i> My Wallet</Link>
          <Link href="#" className="nav-item"><i className="fa-solid fa-file-invoice-dollar"></i> Request Stock</Link>
          <Link href="#" className="nav-item"><i className="fa-solid fa-chart-line"></i> Sales Report</Link>
          <div className="nav-section-label">Account</div>
          <Link href="#" className="nav-item"><i className="fa-solid fa-store"></i> Franchise Profile</Link>
          <Link href="/login" className="nav-item"><i className="fa-solid fa-right-from-bracket"></i> Logout</Link>
        </nav>

        <div className="sidebar-footer">
          <div className="admin-profile">
            <div className="profile-avatar" style={{background: 'linear-gradient(135deg, var(--accent), var(--accent2))'}}>P</div>
            <div className="profile-info">
              <h4>AFI13880</h4>
              <span>Pune West Branch</span>
            </div>
            <Link href="/login" className="logout-btn" title="Logout"><i className="fa-solid fa-right-from-bracket"></i></Link>
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <div className="main">
        {/* TOPBAR */}
        <div className="dashboard-topbar">
          <div className="page-title">
            <h2>Franchise Dashboard</h2>
            <p>Pune West Branch Overview</p>
          </div>
          <div className="topbar-right">
            <button className="notif-btn" title="Notifications">
              <i className="fa-regular fa-bell"></i>
              <span className="notif-dot"></span>
            </button>
            <div className="user-chip">
              <span>🏪</span>
              <span>AFI13880</span>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        {children}
      </div>
    </>
  );
}
