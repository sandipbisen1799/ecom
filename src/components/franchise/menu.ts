export interface FranchiseMenuItem {
  title: string;
  path?: string;
  icon: string;
  submenu?: { title: string; path: string }[];
}

export const franchiseMenu: FranchiseMenuItem[] = [
  {
    title: 'Dashboard',
    path: '/franchise',
    icon: 'fa-solid fa-house',
  },
  {
    title: 'My Profile',
    icon: 'fa-solid fa-user',
    submenu: [
      { title: 'Franchise Profile', path: '/franchise/profile' },
    ]
  },
  {
    title: 'Generate Bill',
    path: '/franchise/generate-bill',
    icon: 'fa-solid fa-file-invoice',
  },
  {
    title: 'Today Sale',
    path: '/franchise/today-sale',
    icon: 'fa-solid fa-calendar-day',
  },
  {
    title: 'Total Sale History',
    path: '/franchise/total-sale-history',
    icon: 'fa-solid fa-chart-line',
  },
  {
    title: 'Franchise Incomes',
    path: '/franchise/incomes',
    icon: 'fa-solid fa-coins',
  },
  {
    title: 'KYC Verification',
    path: '/franchise/kyc',
    icon: 'fa-solid fa-id-card-clip',
  },
  {
    title: 'Stock',
    icon: 'fa-solid fa-box',
    submenu: [
      { title: 'Stock Transfer', path: '/franchise/stock/transfer' },
      { title: 'Stock History', path: '/franchise/stock/history' },
    ]
  },
  {
    title: 'Withdrawal',
    icon: 'fa-solid fa-money-bill-transfer',
    submenu: [
      { title: 'Request Withdrawal', path: '/franchise/withdrawal/request' },
      { title: 'Withdrawal History', path: '/franchise/withdrawal/history' },
    ]
  },
  {
    title: 'Stock Details',
    icon: 'fa-solid fa-boxes-stacked',
    submenu: [
      { title: 'Current Stock', path: '/franchise/stock/details' },
    ]
  }
];