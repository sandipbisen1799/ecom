'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { adminMenuItems, type MainMenuItem } from './menu';

interface AdminSidebarProps {
  open: boolean;
  onClose: () => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

function isItemActive(item: MainMenuItem, pathname: string): boolean {
  if (item.href === pathname) return true;
  if (!item.subItems) return false;
  return item.subItems.some((sub) => {
    if (sub.hasSub && sub.subItems) {
      return sub.subItems.some((leaf) => leaf.href === pathname);
    }
    return sub.href === pathname;
  });
}

export default function AdminSidebar({ open, onClose, collapsed, onToggleCollapse }: AdminSidebarProps) {
  const pathname = usePathname();
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({});
  const [expandedSubMenus, setExpandedSubMenus] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const initialParent: Record<string, boolean> = {};
    const initialChild: Record<string, boolean> = {};

    adminMenuItems.forEach((item) => {
      if (item.hasSub && item.subItems) {
        let isParentActive = false;
        item.subItems.forEach((sub) => {
          if (sub.hasSub && sub.subItems) {
            const isChildActive = sub.subItems.some((leaf) => leaf.href === pathname);
            if (isChildActive) {
              initialChild[sub.label] = true;
              isParentActive = true;
            }
          } else if (sub.href === pathname) {
            isParentActive = true;
          }
        });
        if (isParentActive) initialParent[item.label] = true;
      }
    });

    setExpandedMenus(initialParent);
    setExpandedSubMenus(initialChild);
  }, [pathname]);

  const toggleMenu = (label: string) => {
    setExpandedMenus((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const toggleSubMenu = (label: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedSubMenus((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <motion.aside
      className={`sidebar ${open ? 'open' : ''} ${collapsed ? 'collapsed' : ''}`}
      initial={false}
      animate={{ x: 0 }}
    >
      <div className="sidebar-glow" />

      <div className="sidebar-logo">
        <Link href="/admin" className="sidebar-brand" onClick={onClose}>
          <motion.div
            className="sidebar-brand-icon"
            whileHover={{ scale: 1.08, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            AHK
          </motion.div>
          <div className="sidebar-brand-text">
            <span className="brand-title">
              Aurra <span className="brand-accent">Health</span>
            </span>
            <span className="brand-sub">Admin Panel</span>
          </div>
        </Link>
        <motion.button
          className="sidebar-collapse-btn"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Collapse sidebar"
          onClick={onToggleCollapse}
        >
          <i className={`fa-solid ${collapsed ? 'fa-angles-right' : 'fa-angles-left'}`} />
        </motion.button>
      </div>

      <div className="sidebar-search">
        <i className="fa-solid fa-magnifying-glass" />
        <input type="text" placeholder="Search menu..." />
      </div>

      <nav className="sidebar-nav">
        <span className="nav-section-label">Main Menu</span>
        {adminMenuItems.map((item, i) => {
          const hasSub = item.hasSub && item.subItems && item.subItems.length > 0;
          const isMenuOpen = expandedMenus[item.label];
          const isLinkActive = !hasSub && pathname === item.href;
          const hasActiveSub = isItemActive(item, pathname);

          return (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.03, duration: 0.3 }}
            >
              {hasSub ? (
                <>
                  <motion.div
                    className={`nav-item nav-item-parent ${isMenuOpen ? 'open-parent' : ''} ${hasActiveSub ? 'active' : ''}`}
                    onClick={() => toggleMenu(item.label)}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="nav-icon-wrap">
                      <i className={`fa-solid ${item.icon}`} />
                    </span>
                    <span className="nav-label">{item.label}</span>
                    {item.badge && <span className="nav-badge">{item.badge}</span>}
                    <motion.i
                      className="fa-solid fa-chevron-right arrow-icon"
                      animate={{ rotate: isMenuOpen ? 90 : 0 }}
                      transition={{ duration: 0.25 }}
                    />
                    {hasActiveSub && <span className="nav-active-bar" />}
                  </motion.div>

                  <AnimatePresence initial={false}>
                    {isMenuOpen && (
                      <motion.div
                        className="nav-submenu motion-submenu"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                      >
                        {item.subItems?.map((sub) => {
                          if (sub.hasSub && sub.subItems) {
                            const isSubOpen = expandedSubMenus[sub.label];
                            const hasActiveLeaf = sub.subItems.some((leaf) => leaf.href === pathname);

                            return (
                              <div key={sub.label}>
                                <motion.div
                                  className={`nav-item-sub-trigger ${isSubOpen ? 'open-child' : ''} ${hasActiveLeaf ? 'active' : ''}`}
                                  onClick={(e) => toggleSubMenu(sub.label, e)}
                                  whileHover={{ x: 4 }}
                                >
                                  <i className="fa-solid fa-circle sub-dot" />
                                  {sub.label}
                                  <motion.i
                                    className="fa-solid fa-chevron-right arrow-icon"
                                    animate={{ rotate: isSubOpen ? 90 : 0 }}
                                    transition={{ duration: 0.2 }}
                                  />
                                </motion.div>

                                <AnimatePresence initial={false}>
                                  {isSubOpen && (
                                    <motion.div
                                      className="nav-sub-submenu motion-submenu"
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: 'auto', opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      transition={{ duration: 0.22 }}
                                    >
                                      {sub.subItems.map((leaf) => (
                                        <Link
                                          key={leaf.label}
                                          href={leaf.href}
                                          className={`nav-item-leaf ${pathname === leaf.href ? 'active' : ''}`}
                                          onClick={onClose}
                                        >
                                          {pathname === leaf.href && (
                                            <motion.span
                                              className="leaf-indicator"
                                              layoutId="activeLeaf"
                                              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                                            />
                                          )}
                                          {leaf.label}
                                        </Link>
                                      ))}
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            );
                          }

                          return (
                            <Link
                              key={sub.label}
                              href={sub.href || '#'}
                              className={`nav-item nav-item-sub ${pathname === sub.href ? 'active' : ''}`}
                              onClick={onClose}
                            >
                              <i className="fa-solid fa-circle sub-dot" />
                              {sub.label}
                            </Link>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              ) : (
                <Link
                  href={item.href || '#'}
                  className={`nav-item ${isLinkActive ? 'active' : ''}`}
                  onClick={onClose}
                >
                  <span className="nav-icon-wrap">
                    <i className={`fa-solid ${item.icon}`} />
                  </span>
                  <span className="nav-label">{item.label}</span>
                  {isLinkActive && (
                    <motion.span
                      className="nav-active-bar"
                      layoutId="activeNav"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </Link>
              )}
            </motion.div>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-user">
          <motion.div
            className="profile-avatar"
            whileHover={{ scale: 1.08 }}
          >
            A
          </motion.div>
          <div className="profile-info">
            <h4>Admin User</h4>
            <span>Super Admin</span>
          </div>
          <span className="online-dot" title="Online" />
        </div>
        <Link href="/login" className="nav-item nav-logout" onClick={onClose}>
          <span className="nav-icon-wrap logout-icon">
            <i className="fa-solid fa-right-from-bracket" />
          </span>
          <span className="nav-label">Logout</span>
        </Link>
      </div>
    </motion.aside>
  );
}
