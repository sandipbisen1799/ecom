'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { franchiseMenu } from './menu';

export default function FranchiseSidebar({ 
  sidebarOpen, 
  toggleSidebar,
  collapsed,
  onToggleCollapse
}: { 
  sidebarOpen: boolean, 
  toggleSidebar: () => void,
  collapsed: boolean,
  onToggleCollapse: () => void
}) {
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

  // Auto-open menus that contain the active path
  useEffect(() => {
    const currentOpen: Record<string, boolean> = {};
    franchiseMenu.forEach(item => {
      if (item.submenu) {
        if (item.submenu.some(sub => pathname === sub.path)) {
          currentOpen[item.title] = true;
        }
      }
    });
    setOpenMenus(prev => ({ ...prev, ...currentOpen }));
  }, [pathname]);

  const toggleSubmenu = (title: string) => {
    setOpenMenus(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  return (
    <>
      <button className="mob-toggle" onClick={toggleSidebar}><i className="fa-solid fa-bars"></i></button>
      <div className={`overlay-bg ${sidebarOpen ? 'show' : ''}`} onClick={toggleSidebar}></div>

      <aside className={`sidebar ${sidebarOpen ? 'open' : ''} ${collapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-logo">
          <div className="sidebar-brand">
            <div className="sidebar-brand-icon"><i className="fa-solid fa-store"></i></div>
            <div className="sidebar-brand-text">
              <span className="brand-title">Aurra <span className="brand-accent">Health</span></span>
              <span className="brand-sub">Franchise Panel</span>
            </div>
          </div>
          <button
            className="sidebar-collapse-btn"
            onClick={onToggleCollapse}
            aria-label="Collapse sidebar"
            style={{ marginLeft: 'auto' }}
          >
            <i className={`fa-solid ${collapsed ? 'fa-angles-right' : 'fa-angles-left'}`} />
          </button>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-section-label">Main Menu</div>
          {franchiseMenu.map((item, idx) => {
            const hasSub = !!item.submenu;
            const isActive = !hasSub && pathname === item.path;
            const isOpen = openMenus[item.title];

            if (hasSub) {
              return (
                <div key={idx} className="nav-submenu">
                  <div 
                    className={`nav-item nav-item-parent ${isOpen ? 'open-parent' : ''}`}
                    onClick={() => toggleSubmenu(item.title)}
                  >
                    <div className="flex items-center gap-[10px]">
                      <div className="nav-icon-wrap"><i className={item.icon}></i></div>
                      <span>{item.title}</span>
                    </div>
                    <i className="fa-solid fa-chevron-right arrow-icon"></i>
                  </div>
                  
                  <div className="motion-submenu" style={{ height: isOpen ? 'auto' : 0 }}>
                    {item.submenu?.map((sub, sIdx) => (
                      <Link 
                        key={sIdx} 
                        href={sub.path} 
                        className={`nav-item nav-item-sub flex items-center ${pathname === sub.path ? 'active' : ''}`}
                      >
                        <i className="fa-solid fa-circle sub-dot"></i>
                        <span>{sub.title}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            }

            return (
              <Link key={idx} href={item.path!} className={`nav-item ${isActive ? 'active' : ''}`}>
                <div className="nav-icon-wrap"><i className={item.icon}></i></div>
                <span>{item.title}</span>
              </Link>
            );
          })}
          
          <div className="nav-section-label mt-4">Account</div>
          <Link href="/login" className="nav-item"><div className="nav-icon-wrap"><i className="fa-solid fa-right-from-bracket"></i></div><span>Logout</span></Link>
        </nav>

        <div className="sidebar-footer" style={{ borderTop: '1px solid rgba(255,255,255,.08)', padding: '16px', background: 'rgba(255,255,255,.02)' }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white font-bold shadow-lg">
              AH
            </div>
            <div>
              <h4 className="text-white text-sm font-bold m-0">AFI13880</h4>
              <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Franchise</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}