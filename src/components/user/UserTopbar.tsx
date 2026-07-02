'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { buttonHover, buttonTap } from '@/lib/motion';

interface UserTopbarProps {
  pageSub: string;
  onMenuToggle: () => void;
}

export default function UserTopbar({ pageSub, onMenuToggle }: UserTopbarProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const notifications = [
    { id: 1, title: 'Payout Processed Successfully', desc: '₹3,200 has been transferred via UPI', time: '5m ago', unread: true },
    { id: 2, title: 'New Member Joined Downline', desc: 'Apurva Sen registered under your left leg', time: '2h ago', unread: true },
    { id: 3, title: 'Monthly Rank Updated', desc: 'Congratulations! You achieved Gold Member status', time: '1d ago', unread: false },
  ];

  return (
    <motion.div
      className="dashboard-topbar"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="topbar-left">
        <motion.button
          className="topbar-menu-btn"
          onClick={onMenuToggle}
          whileHover={buttonHover}
          whileTap={buttonTap}
          aria-label="Toggle menu"
        >
          <i className="fa-solid fa-bars" />
        </motion.button>
        <h2 className="topbar-title">My Dashboard</h2>
        <div className="topbar-divider" />
        <div className="admin-breadcrumb">
          <Link href="/user">
            <i className="fa-solid fa-house" />
          </Link>
          <i className="fa-solid fa-chevron-right crumb-sep" />
          <motion.span
            className="active-crumb"
            key={pageSub}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            {pageSub}
          </motion.span>
        </div>
      </div>

      <div className="topbar-right">
        <div className="search-wrap topbar-search">
          <i className="fa-solid fa-magnifying-glass" />
          <input type="text" placeholder="Search..." />
        </div>

        {/* Notifications overlay wrapper */}
        <div style={{ position: 'relative' }}>
          <motion.button
            className="notif-btn"
            title="Notifications"
            whileHover={{ scale: 1.08 }}
            whileTap={buttonTap}
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfileMenu(false);
            }}
          >
            <i className="fa-regular fa-bell" />
            <motion.span
              className="notif-dot"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.button>

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
                  <span className="font-extrabold text-slate-800 text-xs uppercase tracking-wider">User Alerts</span>
                  <span className="text-[10px] bg-amber-500 text-white font-bold px-2 py-0.5 rounded-full">2 New</span>
                </div>
                <div className="max-h-72 overflow-y-auto">
                  {notifications.map((n) => (
                    <div key={n.id} className={`p-3.5 border-b border-gray-50 hover:bg-slate-50 cursor-pointer flex gap-3 items-start transition ${n.unread ? 'bg-amber-50/20' : ''}`}>
                      <div className="w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: n.unread ? '#3b82f6' : '#cbd5e1' }} />
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

        {/* Profile overlay wrapper */}
        <div style={{ position: 'relative' }}>
          <motion.div
            className="user-profile-header-chip"
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={buttonTap}
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowNotifications(false);
            }}
          >
            <div className="av-container">
              <span>👤</span>
            </div>
            <div className="info">
              <span className="name">Rahul Singh</span>
              <span className="role">AHK002</span>
            </div>
            <i className="fa-solid fa-chevron-down chip-arrow" />
          </motion.div>

          <AnimatePresence>
            {showProfileMenu && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                className="absolute right-0 mt-2 w-52 bg-white border border-gray-150 rounded-xl shadow-xl z-50 overflow-hidden py-1.5"
                style={{ right: 0, top: '48px' }}
              >
                <div className="px-4 py-2 border-b border-gray-100 mb-1.5">
                  <p className="text-xs font-bold text-slate-800 m-0">Rahul Singh</p>
                  <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider m-0">ID: AHK002</p>
                </div>
                <Link href="/user/profile" className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 transition" onClick={() => setShowProfileMenu(false)}>
                  <i className="fa-solid fa-user-pen text-slate-400" /> Edit Profile
                </Link>
                <Link href="/user/profile/id-card" className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 transition" onClick={() => setShowProfileMenu(false)}>
                  <i className="fa-solid fa-id-card text-slate-400" /> View Digital ID
                </Link>
                <Link href="/admin" className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 transition" onClick={() => setShowProfileMenu(false)}>
                  <i className="fa-solid fa-users-gear text-slate-400" /> Switch to Admin Panel
                </Link>
                <Link href="/franchise" className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 transition" onClick={() => setShowProfileMenu(false)}>
                  <i className="fa-solid fa-store text-slate-400" /> Switch to Franchise
                </Link>
                <div className="border-t border-gray-100 my-1.5" />
                <Link href="/login" className="flex items-center gap-2.5 px-4 py-2 text-xs font-bold text-red-600 hover:bg-red-50 transition" onClick={() => setShowProfileMenu(false)}>
                  <i className="fa-solid fa-right-from-bracket text-red-400" /> Sign Out
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
