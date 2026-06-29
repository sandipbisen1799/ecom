'use client';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import '../dashboards.css';

interface LeafItem {
  label: string;
  href: string;
}

interface SubMenuItem {
  label: string;
  href?: string;
  hasSub?: boolean;
  subItems?: LeafItem[];
}

interface MainMenuItem {
  label: string;
  icon: string;
  href?: string;
  hasSub?: boolean;
  subItems?: SubMenuItem[];
}

const menuItems: MainMenuItem[] = [
  { label: 'Dashboard', icon: 'fa-gauge-high', href: '/admin' },
  { label: 'Staff', icon: 'fa-user-tie', href: '/admin/sub-admin' },
  {
    label: 'E-commerce',
    icon: 'fa-cart-shopping',
    hasSub: true,
    subItems: [
      {
        label: 'Category',
        hasSub: true,
        subItems: [
          { label: 'Add Category', href: '/admin/add-category' },
          { label: 'Category List', href: '/admin/category-list' }
        ]
      },
      {
        label: 'Product',
        hasSub: true,
        subItems: [
          { label: 'Add Product', href: '/admin/add-product' },
          { label: 'Product List', href: '/admin/product-list' }
        ]
      },
      {
        label: 'Package',
        hasSub: true,
        subItems: [
          { label: 'Add Package', href: '/admin/package_detail' },
          { label: 'Package List', href: '/admin/package_list' }
        ]
      }
    ]
  },
  {
    label: 'Stock Inventory',
    icon: 'fa-boxes-stacked',
    hasSub: true,
    subItems: [
      {
        label: 'Batch',
        hasSub: true,
        subItems: [
          { label: 'Add Batch', href: '/admin/settings' },
          { label: 'Batch List', href: '/admin/settings' }
        ]
      },
      {
        label: 'Supplier',
        hasSub: true,
        subItems: [
          { label: 'Add Supplier', href: '/admin/settings' },
          { label: 'Supplier List', href: '/admin/settings' }
        ]
      },
      {
        label: 'Purchase',
        hasSub: true,
        subItems: [
          { label: 'Add Purchase', href: '/admin/addpurchase' },
          { label: 'Purchase List', href: '/admin/purchase-list' }
        ]
      },
      {
        label: 'Stock Report',
        hasSub: true,
        subItems: [
          { label: 'Open Stock Report', href: '/admin/delivery' },
          { label: 'Stock Chart', href: '/admin/delivery' },
          { label: 'Stock Transfer', href: '/admin/delivery' }
        ]
      }
    ]
  },
  {
    label: 'Franchise',
    icon: 'fa-store',
    hasSub: true,
    subItems: [
      { label: 'Add Franchise', href: '/admin/add-franchise' },
      { label: 'Franchise List', href: '/admin/franchise-list' },
      { label: 'Franchise Incomes', href: '/admin/franchise/incomes' },
      { label: 'Franchise Referral Incomes', href: '/admin/franchise/referral_incomes' },
      { label: 'Franchise KYC', href: '/admin/kyc/verification/franchise' },
      { label: 'Stock Transfer', href: '/admin/stock_transfer' },
      { label: 'Stock Transfer List', href: '/admin/StockTransferList' }
    ]
  },
  { label: 'Billing', icon: 'fa-file-invoice-dollar', href: '/admin/create_repurchase_order' },
  { label: 'Team Tree', icon: 'fa-sitemap', href: '/admin/network' },
  {
    label: 'User List',
    icon: 'fa-users',
    hasSub: true,
    subItems: [
      { label: 'All Users', href: '/admin/users/list' },
      { label: 'Active Users', href: '/admin/users/active' },
      { label: 'Inactive Users', href: '/admin/users/inactive' },
      { label: 'Tree Shift', href: '/admin/users/tree-shift' },
      { label: 'Top Earners', href: '/admin/users/top-earners' }
    ]
  },
  {
    label: 'Customer',
    icon: 'fa-user-group',
    hasSub: true,
    subItems: [
      { label: 'Customer-list', href: '/admin/customer-list' },
      { label: 'Customer Order list', href: '/admin/customer/order/list' }
    ]
  },
  {
    label: 'Order History',
    icon: 'fa-receipt',
    hasSub: true,
    subItems: [
      { label: 'All Orders', href: '/admin/orders' },
      { label: 'Invoice Reports', href: '/admin/reports' }
    ]
  },
  {
    label: 'Expense System',
    icon: 'fa-wallet',
    hasSub: true,
    subItems: [
      { label: 'Add Expense', href: '/admin/add-expense' },
      { label: 'Expense List', href: '/admin/list-expense' },
      { label: 'Debit Expense', href: '/admin/debit-expense' }
    ]
  },
  {
    label: 'Withdrawal',
    icon: 'fa-money-bill-transfer',
    hasSub: true,
    subItems: [
      { label: 'Pending Payouts', href: '/admin/payouts' },
      { label: 'Completed Log', href: '/admin/payouts' }
    ]
  },
  {
    label: 'Power',
    icon: 'fa-sliders',
    hasSub: true,
    subItems: [
      { label: 'Settings', href: '/admin/settings' },
      { label: 'Announcements', href: '/admin/announcements' }
    ]
  },
  {
    label: 'Income Summary',
    icon: 'fa-chart-pie',
    hasSub: true,
    subItems: [
      { label: 'Earnings Report', href: '/admin/earnings' }
    ]
  }
];

const pageTitles: Record<string, { title: string; sub: string }> = {
  '/admin': { title: 'Dashboard', sub: 'Overview' },
  '/admin/sub-admin': { title: 'Dashboard', sub: 'Sub Admin List' },
  '/admin/add-category': { title: 'Dashboard', sub: 'Add Category' },
  '/admin/category-list': { title: 'Dashboard', sub: 'Category List' },
  '/admin/add-product': { title: 'Dashboard', sub: 'Add Product' },
  '/admin/product-list': { title: 'Dashboard', sub: 'Product List' },
  '/admin/package_detail': { title: 'Dashboard', sub: 'Add Package' },
  '/admin/package_list': { title: 'Dashboard', sub: 'Package List' },
  '/admin/addpurchase': { title: 'Dashboard', sub: 'Add Purchase' },
  '/admin/purchase-list': { title: 'Dashboard', sub: 'Purchase List' },
  '/admin/create_repurchase_order': { title: 'Dashboard', sub: 'Billing' },
  '/admin/customer-list': { title: 'Dashboard', sub: 'Customer List' },
  '/admin/customer/order/list': { title: 'Dashboard', sub: 'Customer Order List' },
  '/admin/customer/invoice': { title: 'Dashboard', sub: 'Billing Invoice' },
  '/admin/users/list': { title: 'Dashboard', sub: 'User List' },
  '/admin/users/active': { title: 'Dashboard', sub: 'Active Members' },
  '/admin/users/inactive': { title: 'Dashboard', sub: 'Inactive Members' },
  '/admin/users/tree-shift': { title: 'Dashboard', sub: 'Tree Shift' },
  '/admin/users/top-earners': { title: 'Dashboard', sub: 'Top Earners' },
  '/admin/members': { title: 'Dashboard', sub: 'Members Directory' },
  '/admin/products': { title: 'Dashboard', sub: 'Product Catalog' },
  '/admin/orders': { title: 'Dashboard', sub: 'Orders Registry' },
  '/admin/earnings': { title: 'Dashboard', sub: 'Earnings Overview' },
  '/admin/network': { title: 'Dashboard', sub: 'Genealogy Tree' },
  '/admin/add-expense': { title: 'Dashboard', sub: 'Add Expense' },
  '/admin/list-expense': { title: 'Dashboard ddd', sub: 'Expense List' },
  '/admin/debit-expense': { title: 'Dashboard', sub: 'Debit Expense' },
  '/admin/add-franchise': { title: 'Dashboard', sub: 'Add Franchise' },
  '/admin/franchise-list': { title: 'Dashboard ddd', sub: 'Franchise List' },
  '/admin/franchise': { title: 'Dashboard', sub: 'Franchise Directory' },
  '/admin/delivery': { title: 'Dashboard', sub: 'Logistics & Shipments' },
  '/admin/payouts': { title: 'Dashboard', sub: 'Payout Management' },
  '/admin/reports': { title: 'Dashboard', sub: 'Reports & Analytics' },
  '/admin/announcements': { title: 'Dashboard', sub: 'Announcements' },
  '/admin/settings': { title: 'Dashboard', sub: 'System Settings' },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({});
  const [expandedSubMenus, setExpandedSubMenus] = useState<Record<string, boolean>>({});
  const pathname = usePathname();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const pageInfo = pageTitles[pathname] || { title: 'Dashboard', sub: 'Details' };

  // Set initial expanded menus based on route match
  useEffect(() => {
    const initialParent: Record<string, boolean> = {};
    const initialChild: Record<string, boolean> = {};
    
    menuItems.forEach(item => {
      if (item.hasSub && item.subItems) {
        let isParentActive = false;
        item.subItems.forEach(sub => {
          if (sub.hasSub && sub.subItems) {
            const isChildActive = sub.subItems.some(leaf => leaf.href === pathname);
            if (isChildActive) {
              initialChild[sub.label] = true;
              isParentActive = true;
            }
          } else {
            if (sub.href === pathname) {
              isParentActive = true;
            }
          }
        });
        if (isParentActive) {
          initialParent[item.label] = true;
        }
      }
    });
    setExpandedMenus(initialParent);
    setExpandedSubMenus(initialChild);
  }, [pathname]);

  const toggleMenu = (label: string) => {
    setExpandedMenus(prev => ({
      ...prev,
      [label]: !prev[label]
    }));
  };

  const toggleSubSubMenu = (label: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Avoid triggering parent toggle
    setExpandedSubMenus(prev => ({
      ...prev,
      [label]: !prev[label]
    }));
  };

  return (
    <>
      <button className="mob-toggle" onClick={toggleSidebar}>
        <i className="fa-solid fa-bars"></i>
      </button>
      <div className={`overlay-bg ${sidebarOpen ? 'show' : ''}`} onClick={toggleSidebar}></div>

      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        {/* SWA MLM Header logo block */}
        <div className="sidebar-logo">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: '1' }}>
              <span style={{ fontWeight: '900', fontSize: '18px', letterSpacing: '0.5px', color: '#ea580c' }}>
                SWA <span style={{ color: '#3b82f6' }}>MLM</span>
              </span>
              <span style={{ fontSize: '7px', fontWeight: '700', letterSpacing: '0.5px', color: '#1e3a8a', marginTop: '2px' }}>
                MLM SOFTWARE
              </span>
            </div>
          </div>
          <Link href="#" style={{ color: '#333', fontSize: '14px', padding: '4px' }}>
            <i className="fa-solid fa-arrow-left"></i>
          </Link>
        </div>

        <nav className="sidebar-nav" style={{ padding: '8px 0' }}>
          {menuItems.map((item) => {
            const hasSub = item.hasSub && item.subItems && item.subItems.length > 0;
            const isMenuOpen = expandedMenus[item.label];
            const isLinkActive = !hasSub && pathname === item.href;
            
            // Check if any sub-item (or nested leaf) is active
            let hasActiveSub = false;
            if (hasSub && item.subItems) {
              hasActiveSub = item.subItems.some(sub => {
                if (sub.hasSub && sub.subItems) {
                  return sub.subItems.some(leaf => leaf.href === pathname);
                }
                return sub.href === pathname;
              });
            }

            return (
              <div key={item.label}>
                {hasSub ? (
                  <>
                    <div
                      className={`nav-item ${isMenuOpen ? 'open-parent' : ''} ${hasActiveSub ? 'active' : ''}`}
                      onClick={() => toggleMenu(item.label)}
                    >
                      <i className={`fa-solid ${item.icon}`}></i> {item.label}
                      <i className={`fa-solid fa-chevron-right arrow-icon`}></i>
                    </div>
                    <div className={`nav-submenu ${isMenuOpen ? 'open' : ''}`}>
                      {item.subItems?.map(sub => {
                        if (sub.hasSub && sub.subItems) {
                          const isSubOpen = expandedSubMenus[sub.label];
                          const hasActiveLeaf = sub.subItems.some(leaf => leaf.href === pathname);

                          return (
                            <div key={sub.label} style={{ display: 'flex', flexDirection: 'column' }}>
                              <div
                                className={`nav-item-sub-trigger ${isSubOpen ? 'open-child' : ''} ${hasActiveLeaf ? 'active' : ''}`}
                                onClick={(e) => toggleSubSubMenu(sub.label, e)}
                              >
                                <i className="fa-solid fa-circle" style={{ fontSize: '6px', marginRight: '8px', opacity: 0.7 }}></i>
                                {sub.label}
                                <i className="fa-solid fa-chevron-right arrow-icon"></i>
                              </div>
                              <div className={`nav-sub-submenu ${isSubOpen ? 'open' : ''}`}>
                                {sub.subItems.map(leaf => (
                                  <Link
                                    key={leaf.label}
                                    href={leaf.href}
                                    className={`nav-item-leaf ${pathname === leaf.href ? 'active' : ''}`}
                                    onClick={() => setSidebarOpen(false)}
                                  >
                                    {leaf.label}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          );
                        } else {
                          return (
                            <Link
                              key={sub.label}
                              href={sub.href || '#'}
                              className={`nav-item ${pathname === sub.href ? 'active' : ''}`}
                              onClick={() => setSidebarOpen(false)}
                            >
                              <i className="fa-solid fa-circle" style={{ fontSize: '6px', marginRight: '8px', opacity: 0.7 }}></i>
                              {sub.label}
                            </Link>
                          );
                        }
                      })}
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.href || '#'}
                    className={`nav-item ${isLinkActive ? 'active' : ''}`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <i className={`fa-solid ${item.icon}`}></i> {item.label}
                  </Link>
                )}
              </div>
            );
          })}
        </nav>

        <div className="sidebar-footer" style={{ borderTop: '1px solid rgba(255,255,255,.06)', padding: '10px 8px' }}>
          <Link href="/login" className="nav-item">
            <i className="fa-solid fa-right-from-bracket"></i> Logout
          </Link>
        </div>
      </aside>

      <div className="main" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <div className="dashboard-topbar">
          {/* SWA Custom breadcrumbs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#333', margin: 0 }}>Dashboard</h2>
            <div style={{ height: '20px', width: '1px', background: '#ccc' }}></div>
            <div className="admin-breadcrumb">
              <Link href="/admin"><i className="fa-solid fa-house"></i></Link>
              <span style={{ color: '#888' }}>&gt;</span>
              <span className="active-crumb">{pageInfo.sub}</span>
            </div>
          </div>
          
          <div className="topbar-right">
            <button className="notif-btn" title="Notifications" style={{ marginRight: '8px' }}>
              <i className="fa-regular fa-bell"></i>
              <span className="notif-dot"></span>
            </button>
            {/* Rectangular user profile block matching screenshot */}
            <div className="admin-profile-header-chip">
              <div className="av-container">
                <span style={{ fontSize: '18px' }}>👦</span>
              </div>
              <div className="info">
                <span className="name">Aurra Health Kart</span>
                <span className="role">Admin</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content viewport */}
        <div style={{ flex: '1' }}>
          {children}
        </div>

        {/* Footer */}
        <footer className="admin-footer-bar">
          © 2026 Swa Ecommerce • All rights reserved
        </footer>
      </div>
    </>
  );
}
