'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { buttonHover, buttonTap } from '@/lib/motion';

interface UserTopbarProps {
  pageSub: string;
  onMenuToggle: () => void;
}

export default function UserTopbar({ pageSub, onMenuToggle }: UserTopbarProps) {
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

        <motion.button
          className="notif-btn"
          title="Notifications"
          whileHover={{ scale: 1.08 }}
          whileTap={buttonTap}
        >
          <i className="fa-regular fa-bell" />
          <motion.span
            className="notif-dot"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.button>

        <motion.div
          className="user-profile-header-chip"
          whileHover={{ scale: 1.02, y: -1 }}
          whileTap={buttonTap}
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
      </div>
    </motion.div>
  );
}
