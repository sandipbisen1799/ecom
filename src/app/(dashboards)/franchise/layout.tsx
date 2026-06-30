'use client';
import { useState } from 'react';
import '../dashboards.css';
import FranchiseSidebar from '@/components/franchise/FranchiseSidebar';

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
      <FranchiseSidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      {/* MAIN CONTENT */}
      <div className="main">
        {/* TOPBAR */}
        <div className="dashboard-topbar">
          <div className="page-title">
            <h2>Franchise Dashboard</h2>
            <p>Welcome back, Auraa Healthcare</p>
          </div>
          <div className="topbar-right">
            <button className="notif-btn" title="Notifications">
              <i className="fa-regular fa-bell"></i>
              <span className="notif-dot"></span>
            </button>
            <div className="flex items-center gap-3 bg-white px-3 py-1.5 rounded-lg border border-gray-200 shadow-sm cursor-pointer hover:bg-gray-50 transition">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white text-sm font-bold">
                AH
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-bold text-gray-900 m-0 leading-tight">AFI13880</p>
                <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide m-0">Franchise</p>
              </div>
              <i className="fa-solid fa-chevron-down text-xs text-gray-400 ml-1"></i>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        {children}
      </div>
    </>
  );
}