'use client';
import { useState } from 'react';
import Link from 'next/link';
import '../dashboards.css';

export default function UserLayout({
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
      {/* Override root variables for user dashboard */}
      <style>{`
        :root {
          --sidebar: #1a1a2e;
          --accent: #3b82f6;
          --accent2: #60a5fa;
          --green: #22c55e;
          --orange: #f59e0b;
          --red: #ef4444;
          --card: #fff;
          --bg: #f0f4f8;
          --text: #1a1a2e;
          --muted: #6b7280;
          --border: #e5e7eb;
        }
        .user-chip { display: flex; align-items: center; gap: 7px; background: linear-gradient(135deg, var(--accent), #2563eb); padding: 5px 12px; border-radius: 8px; cursor: pointer; }
        .user-chip span { font-size: 12px; font-weight: 600; color: #fff; }
        .welcome-banner {
          background: linear-gradient(135deg, var(--accent), #1d4ed8);
          border-radius: 20px; padding: 28px 30px; color: #fff; margin-bottom: 24px;
          display: flex; align-items: center; justify-content: space-between; position: relative; overflow: hidden;
        }
        .welcome-banner::before { content: ''; position: absolute; right: -60px; top: -60px; width: 200px; height: 200px; background: rgba(255,255,255,.08); border-radius: 50%; }
        .welcome-banner::after  { content: ''; position: absolute; right: 80px; bottom: -40px; width: 120px; height: 120px; background: rgba(255,255,255,.05); border-radius: 50%; }
        .welcome-text h2 { font-size: 24px; font-weight: 800; margin-bottom: 6px; }
        .welcome-text p { font-size: 14px; opacity: .85; }
        .welcome-stats { display: flex; gap: 28px; position: relative; z-index: 1; }
        .w-stat { text-align: center; }
        .w-stat .num { font-size: 26px; font-weight: 800; }
        .w-stat .lbl { font-size: 11px; opacity: .75; }
        .btn-white { padding: 10px 22px; background: rgba(255,255,255,.2); backdrop-filter: blur(4px); border: 1px solid rgba(255,255,255,.3); border-radius: 9px; color: #fff; font-size: 13px; font-weight: 600; cursor: pointer; font-family: 'Poppins', sans-serif; transition: all .3s; margin-top: 14px; display: inline-block; text-decoration: none; }
        .btn-white:hover { background: rgba(255,255,255,.35); }
        .pill { display: inline-block; padding: 3px 9px; border-radius: 20px; font-size: 11px; font-weight: 600; }
        .p-green  { background: #dcfce7; color: #16a34a; }
        .p-yellow { background: #fef9c3; color: #ca8a04; }
        .p-blue   { background: #dbeafe; color: #1d4ed8; }
        .p-red    { background: #fee2e2; color: #dc2626; }
        
        .tree-wrap { display: flex; flex-direction: column; align-items: center; gap: 16px; }
        .tree-level { display: flex; gap: 16px; justify-content: center; }
        .tree-node { display: flex; flex-direction: column; align-items: center; gap: 6px; cursor: pointer; }
        .tree-avatar { width: 52px; height: 52px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 20px; font-weight: 700; border: 3px solid #fff; box-shadow: 0 4px 14px rgba(0,0,0,.15); transition: transform .2s; }
        .tree-avatar:hover { transform: scale(1.1); }
        .tree-name { font-size: 11px; font-weight: 600; text-align: center; }
        .tree-id   { font-size: 10px; color: var(--muted); }
        .tree-line { width: 2px; height: 24px; background: var(--border); }
        
        .progress-row { margin-bottom: 16px; }
        .progress-lbl { display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 5px; }
        .progress-lbl span:first-child { font-weight: 600; }
        .progress-lbl span:last-child { color: var(--muted); }
        .progress-track { height: 8px; background: var(--border); border-radius: 4px; overflow: hidden; }
        .progress-fill  { height: 100%; border-radius: 4px; transition: width .8s ease; }
        
        .quick-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
        .quick-btn { display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 18px 10px; background: #f8f9fa; border-radius: 12px; cursor: pointer; transition: all .3s; text-decoration: none; color: var(--text); }
        .quick-btn:hover { background: var(--accent); color: #fff; transform: translateY(-3px); }
        .quick-btn:hover i { color: #fff; }
        .quick-btn i { font-size: 24px; color: var(--accent); transition: color .3s; }
        .quick-btn span { font-size: 11px; font-weight: 600; text-align: center; }

        @media (max-width: 700px) {
          .welcome-stats { display: none; }
        }
      `}</style>

      <button className="mob-toggle" onClick={toggleSidebar}><i className="fa-solid fa-bars"></i></button>
      <div className={`overlay-bg ${sidebarOpen ? 'show' : ''}`} onClick={toggleSidebar}></div>

      {/* SIDEBAR */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-logo">
          <div className="logo-circle">👤</div>
          <div className="logo-text">
            <h3>Aurra Health Kart</h3>
            <span>User Panel</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-section-label">Main</div>
          <Link href="/user" className="nav-item active"><i className="fa-solid fa-gauge"></i> Dashboard</Link>
          <Link href="#" className="nav-item"><i className="fa-solid fa-wallet"></i> My Earnings</Link>
          <Link href="#" className="nav-item"><i className="fa-solid fa-shopping-bag"></i> My Orders <span className="nav-badge">2</span></Link>
          <Link href="#" className="nav-item"><i className="fa-solid fa-sitemap"></i> My Network</Link>
          <Link href="#" className="nav-item"><i className="fa-solid fa-store"></i> Shop Now</Link>
          <div className="nav-section-label">Account</div>
          <Link href="#" className="nav-item"><i className="fa-solid fa-hand-holding-dollar"></i> Withdrawal</Link>
          <Link href="#" className="nav-item"><i className="fa-solid fa-clipboard-list"></i> Income Report</Link>
          <Link href="#" className="nav-item"><i className="fa-solid fa-user-circle"></i> My Profile</Link>
          <Link href="#" className="nav-item"><i className="fa-solid fa-headset"></i> Support <span className="nav-badge">1</span></Link>
          <Link href="/login" className="nav-item"><i className="fa-solid fa-right-from-bracket"></i> Logout</Link>
        </nav>

        <div className="sidebar-footer">
          <div className="admin-profile">
            <div className="profile-avatar" style={{background: 'linear-gradient(135deg, var(--accent), var(--accent2))'}}>R</div>
            <div className="profile-info">
              <h4>AHK002 – Rahul</h4>
              <span>User Member</span>
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
            <h2>My Dashboard</h2>
            <p>Track your earnings and network growth</p>
          </div>
          <div className="topbar-right">
            <button className="notif-btn" title="Notifications">
              <i className="fa-regular fa-bell"></i>
              <span className="notif-dot"></span>
            </button>
            <div className="user-chip">
              <span>👤</span>
              <span>AHK002</span>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        {children}
      </div>
    </>
  );
}
