'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { userMenuSections } from './menu';

interface UserSidebarProps {
  open: boolean;
  onClose: () => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export default function UserSidebar({ open, onClose, collapsed, onToggleCollapse }: UserSidebarProps) {
  const pathname = usePathname();

  return (
    <motion.aside
      className={`sidebar user-sidebar ${open ? 'open' : ''} ${collapsed ? 'collapsed' : ''}`}
      initial={false}
      animate={{ x: 0 }}
    >
      <div className="sidebar-glow user-sidebar-glow" />

      <div className="sidebar-logo">
        <Link href="/user" className="sidebar-brand" onClick={onClose}>
          <motion.div
            className="sidebar-brand-icon user-brand-icon"
            whileHover={{ scale: 1.08, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            AHK
          </motion.div>
          <div className="sidebar-brand-text">
            <span className="brand-title">
              Aurra <span className="user-brand-accent">Health</span>
            </span>
            <span className="brand-sub">User Panel</span>
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

      <nav className="sidebar-nav">
        {userMenuSections.map((section) => (
          <div key={section.title}>
            <span className="nav-section-label">{section.title}</span>
            {section.items.map((item, i) => (
              <NavItem 
                key={item.label} 
                item={item} 
                index={i} 
                pathname={pathname} 
                onClose={onClose} 
              />
            ))}
          </div>
        ))}

        {/* Logout — separate from menu sections */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35, duration: 0.3 }}
        >
          <Link href="/login" className="nav-item nav-logout" onClick={onClose}>
            <span className="nav-icon-wrap logout-icon">
              <i className="fa-solid fa-right-from-bracket" />
            </span>
            <span className="nav-label">Logout</span>
          </Link>
        </motion.div>
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-user">
          <motion.div
            className="profile-avatar user-profile-avatar"
            whileHover={{ scale: 1.08 }}
          >
            R
          </motion.div>
          <div className="profile-info">
            <h4>AHK002 – Rahul</h4>
            <span>User Member</span>
          </div>
          <span className="online-dot" title="Online" />
        </div>
      </div>
    </motion.aside>
  );
}

function NavItem({ item, index, pathname, onClose }: { item: any, index: number, pathname: string, onClose: () => void }) {
  const [isOpen, setIsOpen] = require('react').useState(false);
  const isActive = pathname === item.href || (item.subItems && item.subItems.some((s: any) => pathname === s.href));
  
  // Auto-expand if a subitem is active
  require('react').useEffect(() => {
    if (item.subItems && item.subItems.some((s: any) => pathname === s.href)) {
      setIsOpen(true);
    }
  }, [pathname, item]);

  if (item.subItems) {
    return (
      <motion.div
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.03, duration: 0.3 }}
        className="nav-submenu"
      >
        <div 
          className={`nav-item nav-item-parent ${isActive ? 'active' : ''} ${isOpen ? 'open-parent' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="nav-icon-wrap">
            <i className={`fa-solid ${item.icon}`} />
          </span>
          <span className="nav-label">{item.label}</span>
          <i className="fa-solid fa-chevron-right arrow-icon" />
          {isActive && (
            <motion.span
              className="nav-active-bar"
              layoutId="userActiveNav"
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          )}
        </div>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="motion-submenu"
            >
              {item.subItems.map((sub: any) => {
                const isSubActive = pathname === sub.href;
                return (
                  <Link
                    key={sub.label}
                    href={sub.href}
                    className={`nav-item nav-item-sub ${isSubActive ? 'active' : ''}`}
                    onClick={onClose}
                  >
                    <i className="fa-solid fa-circle sub-dot" />
                    <span className="nav-label">{sub.label}</span>
                  </Link>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.03, duration: 0.3 }}
    >
      <Link
        href={item.href}
        className={`nav-item ${isActive ? 'active' : ''}`}
        onClick={onClose}
      >
        <span className="nav-icon-wrap">
          <i className={`fa-solid ${item.icon}`} />
        </span>
        <span className="nav-label">{item.label}</span>
        {item.badge && <span className="nav-badge">{item.badge}</span>}
        {isActive && (
          <motion.span
            className="nav-active-bar"
            layoutId="userActiveNav"
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          />
        )}
      </Link>
    </motion.div>
  );
}
