'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import UserSidebar from './UserSidebar';
import UserTopbar from './UserTopbar';
import PageTransition from '@/components/admin/PageTransition';
import { userPageTitles, userMenuSections, type UserMenuItem } from './menu';
import CommandPalette, { type CommandPaletteItem } from '@/components/ui/CommandPalette';

interface UserShellProps {
  children: React.ReactNode;
}

function flattenUserMenu(sections: typeof userMenuSections): CommandPaletteItem[] {
  const out: CommandPaletteItem[] = [];
  const walk = (item: UserMenuItem, group?: string) => {
    if (item.href && item.href !== '#') out.push({ label: item.label, href: item.href, icon: item.icon, group });
    item.subItems?.forEach((sub) => walk(sub, item.label));
  };
  sections.forEach((section) => section.items.forEach((item) => walk(item)));
  return out;
}

export default function UserShell({ children }: UserShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const pathname = usePathname();
  const pageInfo = userPageTitles[pathname] || { title: 'Dashboard', sub: 'Overview' };

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
      {!sidebarOpen && (
        <motion.button
          className="mob-toggle user-mob-toggle"
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

      <UserSidebar
        open={sidebarOpen}
        onClose={closeSidebar}
        collapsed={sidebarCollapsed}
        onToggleCollapse={handleToggleCollapse}
        onOpenCommand={() => setCommandOpen(true)}
      />

      <CommandPalette
        open={commandOpen}
        onClose={() => setCommandOpen(false)}
        items={flattenUserMenu(userMenuSections)}
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
