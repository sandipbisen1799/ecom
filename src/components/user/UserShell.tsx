'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import UserSidebar from './UserSidebar';
import UserTopbar from './UserTopbar';
import PageTransition from '@/components/admin/PageTransition';
import { userPageTitles } from './menu';

interface UserShellProps {
  children: React.ReactNode;
}

export default function UserShell({ children }: UserShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const pathname = usePathname();
  const pageInfo = userPageTitles[pathname] || { title: 'Dashboard', sub: 'Overview' };

  // Load from localStorage on mount
  require('react').useEffect(() => {
    if (typeof window !== 'undefined') {
      setSidebarCollapsed(localStorage.getItem('ahk_user_sidebar_collapsed') === 'true');
    }
  }, []);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const closeSidebar = () => setSidebarOpen(false);

  const handleToggleCollapse = () => {
    setSidebarCollapsed((prev) => {
      const newVal = !prev;
      localStorage.setItem('ahk_user_sidebar_collapsed', String(newVal));
      return newVal;
    });
  };

  return (
    <>
      <motion.button
        className="mob-toggle user-mob-toggle"
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

      <UserSidebar 
        open={sidebarOpen} 
        onClose={closeSidebar} 
        collapsed={sidebarCollapsed}
        onToggleCollapse={handleToggleCollapse}
      />

      <div className={`main user-main ${sidebarCollapsed ? 'collapsed' : ''}`}>
        <UserTopbar pageSub={pageInfo.sub} onMenuToggle={toggleSidebar} />

        <div className="admin-content-wrap">
          <AnimatePresence mode="wait">
            <PageTransition key={pathname}>
              {children}
            </PageTransition>
          </AnimatePresence>
        </div>

        <footer className="user-footer-bar">
          © 2026 Aurra Health Kart • All rights reserved
        </footer>
      </div>
    </>
  );
}
