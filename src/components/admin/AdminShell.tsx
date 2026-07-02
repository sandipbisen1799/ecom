'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import AdminSidebar from './AdminSidebar';
import AdminTopbar from './AdminTopbar';
import PageTransition from './PageTransition';
import { adminPageTitles, adminMenuItems, type MainMenuItem } from './menu';
import CommandPalette, { type CommandPaletteItem } from '@/components/ui/CommandPalette';

interface AdminShellProps {
  children: React.ReactNode;
}

function flattenAdminMenu(items: MainMenuItem[]): CommandPaletteItem[] {
  const out: CommandPaletteItem[] = [];
  items.forEach((item) => {
    if (item.href) out.push({ label: item.label, href: item.href, icon: item.icon });
    item.subItems?.forEach((sub) => {
      if (sub.href) out.push({ label: sub.label, href: sub.href, icon: item.icon, group: item.label });
      sub.subItems?.forEach((leaf) => {
        out.push({ label: leaf.label, href: leaf.href, icon: item.icon, group: `${item.label} / ${sub.label}` });
      });
    });
  });
  return out;
}

export default function AdminShell({ children }: AdminShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const pathname = usePathname();
  const pageInfo = adminPageTitles[pathname] || { title: 'Dashboard', sub: 'Details' };

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
  require('react').useEffect(() => {
    if (typeof window !== 'undefined') {
      setSidebarCollapsed(localStorage.getItem('ahk_admin_sidebar_collapsed') === 'true');
    }
  }, []);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const closeSidebar = () => setSidebarOpen(false);
  
  const handleToggleCollapse = () => {
    setSidebarCollapsed((prev) => {
      const newVal = !prev;
      localStorage.setItem('ahk_admin_sidebar_collapsed', String(newVal));
      return newVal;
    });
  };

  return (
    <>
      {!sidebarOpen && (
        <motion.button
          className="mob-toggle"
          onClick={toggleSidebar}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Open menu"
        >
          <i className="fa-solid fa-bars" />
        </motion.button>
      )}

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

      <AdminSidebar
        open={sidebarOpen}
        onClose={closeSidebar}
        collapsed={sidebarCollapsed}
        onToggleCollapse={handleToggleCollapse}
        onOpenCommand={() => setCommandOpen(true)}
      />

      <CommandPalette
        open={commandOpen}
        onClose={() => setCommandOpen(false)}
        items={flattenAdminMenu(adminMenuItems)}
      />

      <div className={`main admin-main ${sidebarCollapsed ? 'collapsed' : ''}`}>
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
