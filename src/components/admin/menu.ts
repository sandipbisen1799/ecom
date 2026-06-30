export interface LeafItem {
  label: string;
  href: string;
}

export interface SubMenuItem {
  label: string;
  href?: string;
  hasSub?: boolean;
  subItems?: LeafItem[];
}

export interface MainMenuItem {
  label: string;
  icon: string;
  href?: string;
  hasSub?: boolean;
  badge?: string;
  subItems?: SubMenuItem[];
}

export const adminMenuItems: MainMenuItem[] = [
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
          { label: 'Category List', href: '/admin/category-list' },
        ],
      },
      {
        label: 'Product',
        hasSub: true,
        subItems: [
          { label: 'Add Product', href: '/admin/add-product' },
          { label: 'Product List', href: '/admin/product-list' },
        ],
      },
      {
        label: 'Package',
        hasSub: true,
        subItems: [
          { label: 'Add Package', href: '/admin/package_detail' },
          { label: 'Package List', href: '/admin/package_list' },
        ],
      },
    ],
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
          { label: 'Batch List', href: '/admin/settings' },
        ],
      },
      {
        label: 'Supplier',
        hasSub: true,
        subItems: [
          { label: 'Add Supplier', href: '/admin/settings' },
          { label: 'Supplier List', href: '/admin/settings' },
        ],
      },
      {
        label: 'Purchase',
        hasSub: true,
        subItems: [
          { label: 'Add Purchase', href: '/admin/addpurchase' },
          { label: 'Purchase List', href: '/admin/purchase-list' },
        ],
      },
      {
        label: 'Stock Report',
        hasSub: true,
        subItems: [
          { label: 'Open Stock Report', href: '/admin/delivery' },
          { label: 'Stock Chart', href: '/admin/delivery' },
          { label: 'Stock Transfer', href: '/admin/delivery' },
        ],
      },
    ],
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
      { label: 'Stock Transfer List', href: '/admin/StockTransferList' },
    ],
  },
  { label: 'Billing', icon: 'fa-file-invoice-dollar', href: '/admin/create_repurchase_order' },
  { label: 'Team Tree', icon: 'fa-sitemap', href: '/admin/network' },
  {
    label: 'User List',
    icon: 'fa-users',
    hasSub: true,
    badge: 'New',
    subItems: [
      { label: 'All Users', href: '/admin/users/list' },
      { label: 'Active Users', href: '/admin/users/active' },
      { label: 'Inactive Users', href: '/admin/users/inactive' },
      { label: 'Tree Shift', href: '/admin/users/tree-shift' },
      { label: 'Top Earners', href: '/admin/users/top-earners' },
    ],
  },
  {
    label: 'Customer',
    icon: 'fa-user-group',
    hasSub: true,
    subItems: [
      { label: 'Customer-list', href: '/admin/customer-list' },
      { label: 'Customer Order list', href: '/admin/customer/order/list' },
    ],
  },
  {
    label: 'Order History',
    icon: 'fa-receipt',
    hasSub: true,
    subItems: [
      { label: 'All Orders', href: '/admin/orders' },
      { label: 'Invoice Reports', href: '/admin/reports' },
    ],
  },
  {
    label: 'Expense System',
    icon: 'fa-wallet',
    hasSub: true,
    subItems: [
      { label: 'Add Expense', href: '/admin/add-expense' },
      { label: 'Expense List', href: '/admin/list-expense' },
      { label: 'Debit Expense', href: '/admin/debit-expense' },
    ],
  },
  {
    label: 'Withdrawal',
    icon: 'fa-money-bill-transfer',
    hasSub: true,
    subItems: [
      { label: 'Pending Payouts', href: '/admin/payouts' },
      { label: 'Completed Log', href: '/admin/payouts' },
    ],
  },
  {
    label: 'Power',
    icon: 'fa-sliders',
    hasSub: true,
    subItems: [
      { label: 'Settings', href: '/admin/settings' },
      { label: 'Announcements', href: '/admin/announcements' },
    ],
  },
  {
    label: 'Income Summary',
    icon: 'fa-chart-pie',
    hasSub: true,
    subItems: [{ label: 'Earnings Report', href: '/admin/earnings' }],
  },
];

export const adminPageTitles: Record<string, { title: string; sub: string }> = {
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
  '/admin/list-expense': { title: 'Dashboard', sub: 'Expense List' },
  '/admin/debit-expense': { title: 'Dashboard', sub: 'Debit Expense' },
  '/admin/add-franchise': { title: 'Dashboard', sub: 'Add Franchise' },
  '/admin/franchise-list': { title: 'Dashboard', sub: 'Franchise List' },
  '/admin/franchise': { title: 'Dashboard', sub: 'Franchise Directory' },
  '/admin/delivery': { title: 'Dashboard', sub: 'Logistics & Shipments' },
  '/admin/payouts': { title: 'Dashboard', sub: 'Payout Management' },
  '/admin/reports': { title: 'Dashboard', sub: 'Reports & Analytics' },
  '/admin/announcements': { title: 'Dashboard', sub: 'Announcements' },
  '/admin/settings': { title: 'Dashboard', sub: 'System Settings' },
};
