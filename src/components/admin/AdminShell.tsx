'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import AdminSidebar from './AdminSidebar';
import AdminTopbar from './AdminTopbar';
import PageTransition from './PageTransition';
import { adminPageTitles } from './menu';

interface AdminShellProps {
  children: React.ReactNode;
}

export default function AdminShell({ children }: AdminShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const pageInfo = adminPageTitles[pathname] || { title: 'Dashboard', sub: 'Details' };

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <>
      <motion.button
        className="mob-toggle"
        onClick={toggleSidebar}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open menu"
      >
        <i className="fa-solid fa-bars" />
      </motion.button>

      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            className="overlay-bg show"
            onClick={closeSidebar}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>

      <AdminSidebar open={sidebarOpen} onClose={closeSidebar} />

      <div className="main admin-main">
        <AdminTopbar pageSub={pageInfo.sub} onMenuToggle={toggleSidebar} />

        <div className="admin-content-wrap">
          <AnimatePresence mode="wait">
            <PageTransition key={pathname}>
              {children}
            </PageTransition>
          </AnimatePresence>
        </div>

        <footer className="admin-footer-bar">
          © 2026 Aurra Health Kart • All rights reserved
        </footer>
      </div>
    </>
  );
}
