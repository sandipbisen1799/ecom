'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import '../dashboards.css';
import FranchiseSidebar from '@/components/franchise/FranchiseSidebar';
import { franchiseMenu, type FranchiseMenuItem } from '@/components/franchise/menu';
import CommandPalette, { type CommandPaletteItem } from '@/components/ui/CommandPalette';

function flattenFranchiseMenu(items: FranchiseMenuItem[]): CommandPaletteItem[] {
  const out: CommandPaletteItem[] = [];
  items.forEach((item) => {
    if (item.path) out.push({ label: item.title, href: item.path, icon: item.icon.replace('fa-solid ', '') });
    item.submenu?.forEach((sub) => {
      out.push({ label: sub.title, href: sub.path, icon: item.icon.replace('fa-solid ', ''), group: item.title });
    });
  });
  return out;
}

export default function FranchiseLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandOpen(true);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setSidebarCollapsed(localStorage.getItem('ahk_franchise_sidebar_collapsed') === 'true');
    }
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleToggleCollapse = () => {
    setSidebarCollapsed((prev) => {
      const newVal = !prev;
      localStorage.setItem('ahk_franchise_sidebar_collapsed', String(newVal));
      return newVal;
    });
  };

  const notifications = [
    { id: 1, title: 'Bill Generated', desc: 'Bill #INV8829 generated for ₹4,850', time: '12m ago', unread: true },
    { id: 2, title: 'Stock Received', desc: '100 units of Glow Serum added to inventory', time: '1h ago', unread: true },
    { id: 3, title: 'Withdrawal Approved', desc: 'Franchise payout of ₹15,400 approved', time: '2d ago', unread: false },
  ];

  return (
    <>
      <FranchiseSidebar
        sidebarOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
        collapsed={sidebarCollapsed}
        onToggleCollapse={handleToggleCollapse}
        onOpenCommand={() => setCommandOpen(true)}
      />

      <CommandPalette
        open={commandOpen}
        onClose={() => setCommandOpen(false)}
        items={flattenFranchiseMenu(franchiseMenu)}
      />

      {/* MAIN CONTENT */}
      <div className={`main ${sidebarCollapsed ? 'collapsed' : ''}`}>
        {/* TOPBAR */}
        <div className="dashboard-topbar">
          <div className="page-title">
            <h2>Franchise Dashboard</h2>
            <p>Welcome back, Auraa Healthcare</p>
          </div>
          <div className="topbar-right">
            {/* Notifications Bell Dropdown */}
            <div style={{ position: 'relative' }}>
              <button 
                className="notif-btn" 
                title="Notifications"
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setShowProfileMenu(false);
                }}
              >
                <i className="fa-regular fa-bell"></i>
                <span className="notif-dot"></span>
              </button>

              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 15 }}
                    className="absolute right-0 mt-2 w-80 bg-white border border-gray-150 rounded-xl shadow-xl z-50 overflow-hidden"
                    style={{ right: 0, top: '44px' }}
                  >
                    <div className="p-3.5 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                      <span className="font-extrabold text-slate-800 text-xs uppercase tracking-wider">Franchise Alerts</span>
                      <span className="text-[10px] bg-amber-500 text-white font-bold px-2 py-0.5 rounded-full">2 New</span>
                    </div>
                    <div className="max-h-72 overflow-y-auto">
                      {notifications.map((n) => (
                        <div key={n.id} className={`p-3.5 border-b border-gray-50 hover:bg-slate-50 cursor-pointer flex gap-3 items-start transition ${n.unread ? 'bg-amber-50/20' : ''}`} style={{ textAlign: 'left' }}>
                          <div className="w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: n.unread ? '#f59e0b' : '#cbd5e1' }} />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-xs text-slate-900 leading-snug">{n.title}</h4>
                            <p className="text-[11px] text-slate-500 mt-1 leading-snug">{n.desc}</p>
                            <span className="text-[9px] text-slate-400 font-medium block mt-1.5">{n.time}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Profile Dropdown */}
            <div style={{ position: 'relative' }}>
              <div 
                className="flex items-center gap-3 bg-white px-3 py-1.5 rounded-lg border border-gray-200 shadow-sm cursor-pointer hover:bg-gray-50 transition"
                onClick={() => {
                  setShowProfileMenu(!showProfileMenu);
                  setShowNotifications(false);
                }}
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white text-sm font-bold">
                  AH
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-bold text-gray-900 m-0 leading-tight">AFI13880</p>
                  <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide m-0">Franchise</p>
                </div>
                <i className="fa-solid fa-chevron-down text-xs text-gray-400 ml-1"></i>
              </div>

              <AnimatePresence>
                {showProfileMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 15 }}
                    className="absolute right-0 mt-2 w-52 bg-white border border-gray-150 rounded-xl shadow-xl z-50 overflow-hidden py-1.5"
                    style={{ right: 0, top: '48px' }}
                  >
                    <div className="px-4 py-2 border-b border-gray-100 mb-1.5" style={{ textAlign: 'left' }}>
                      <p className="text-xs font-bold text-slate-800 m-0">Auraa Health</p>
                      <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider m-0">ID: AFI13880</p>
                    </div>
                    <Link href="/franchise/profile" className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 transition" style={{ textDecoration: 'none' }} onClick={() => setShowProfileMenu(false)}>
                      <i className="fa-solid fa-store text-slate-400" /> Store Profile
                    </Link>
                    <Link href="/user" className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 transition" style={{ textDecoration: 'none' }} onClick={() => setShowProfileMenu(false)}>
                      <i className="fa-solid fa-users text-slate-400" /> Switch to User Panel
                    </Link>
                    <Link href="/admin" className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 transition" style={{ textDecoration: 'none' }} onClick={() => setShowProfileMenu(false)}>
                      <i className="fa-solid fa-users-gear text-slate-400" /> Switch to Admin Panel
                    </Link>
                    <div className="border-t border-gray-100 my-1.5" />
                    <Link href="/login" className="flex items-center gap-2.5 px-4 py-2 text-xs font-bold text-red-600 hover:bg-red-50 transition" style={{ textDecoration: 'none' }} onClick={() => setShowProfileMenu(false)}>
                      <i className="fa-solid fa-right-from-bracket text-red-400" /> Sign Out
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        {children}
      </div>
    </>
  );
}