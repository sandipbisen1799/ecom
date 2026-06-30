export interface UserMenuItem {
  label: string;
  icon: string;
  href: string;
  badge?: string;
  subItems?: UserMenuItem[];
}

export interface UserMenuSection {
  title: string;
  items: UserMenuItem[];
}

export const userMenuSections: UserMenuSection[] = [
  {
    title: 'Main',
    items: [
      { label: 'Dashboard', icon: 'fa-gauge-high', href: '/user' },
      { label: 'Shop now', icon: 'fa-cart-shopping', href: '/user/shop' },
      { label: 'Top Earners', icon: 'fa-trophy', href: '/user/top-earners' },
      { 
        label: 'My Profile', 
        icon: 'fa-user', 
        href: '#',
        subItems: [
          { label: 'Profile Info', icon: 'fa-id-card', href: '/user/profile' },
          { label: 'Edit Profile', icon: 'fa-user-pen', href: '/user/profile/edit' },
          { label: 'Welcome Letter', icon: 'fa-envelope-open-text', href: '/user/profile/welcome' },
          { label: 'ID Card', icon: 'fa-address-card', href: '/user/profile/id-card' }
        ]
      },
      { 
        label: 'Income Summary', 
        icon: 'fa-money-bill-trend-up', 
        href: '#',
        subItems: [
          { label: 'Income Report', icon: 'fa-chart-bar', href: '/user/income' }
        ]
      },
      { label: 'Payout Report', icon: 'fa-file-invoice-dollar', href: '/user/payout' },
      { 
        label: 'My Team', 
        icon: 'fa-users', 
        href: '#',
        subItems: [
          { label: 'Direct Referrals', icon: 'fa-user-plus', href: '/user/team/direct' },
          { label: 'Downline', icon: 'fa-sitemap', href: '/user/team/downline' }
        ]
      },
      { 
        label: 'Withdrawal', 
        icon: 'fa-hand-holding-dollar', 
        href: '#',
        subItems: [
          { label: 'Request Withdrawal', icon: 'fa-money-check-dollar', href: '/user/withdrawal/request' },
          { label: 'Withdrawal History', icon: 'fa-clock-rotate-left', href: '/user/withdrawal/history' }
        ]
      },
      { 
        label: 'Order History', 
        icon: 'fa-box-open', 
        href: '#',
        subItems: [
          { label: 'Pending Orders', icon: 'fa-box', href: '/user/orders/pending' },
          { label: 'Completed Orders', icon: 'fa-box-check', href: '/user/orders/completed' }
        ]
      },
      { label: 'KYC Verification', icon: 'fa-shield-halved', href: '/user/kyc' },
      { label: 'My Messages', icon: 'fa-envelope', href: '/user/messages' }
    ],
  }
];

export const userPageTitles: Record<string, { title: string; sub: string }> = {
  '/user': { title: 'User Profile', sub: 'Profile' },
  '/user/shop': { title: 'Shopping', sub: 'Shop Now' },
  '/user/top-earners': { title: 'Top Earners', sub: 'Leaderboard' },
  '/user/profile': { title: 'Profile Info', sub: 'My Profile' },
  '/user/profile/edit': { title: 'Edit Profile', sub: 'My Profile' },
  '/user/profile/welcome': { title: 'Welcome Letter', sub: 'My Profile' },
  '/user/profile/id-card': { title: 'ID Card', sub: 'My Profile' },
  '/user/income': { title: 'Income Report', sub: 'Income Summary' },
  '/user/payout': { title: 'Payout Report', sub: 'Earnings' },
  '/user/team/direct': { title: 'Direct Referrals', sub: 'My Team' },
  '/user/team/downline': { title: 'Downline', sub: 'My Team' },
  '/user/withdrawal/request': { title: 'Request Withdrawal', sub: 'Withdrawal' },
  '/user/withdrawal/history': { title: 'Withdrawal History', sub: 'Withdrawal' },
  '/user/orders/pending': { title: 'Pending Orders', sub: 'Order History' },
  '/user/orders/completed': { title: 'Completed Orders', sub: 'Order History' },
  '/user/kyc': { title: 'KYC Verification', sub: 'Security' },
  '/user/messages': { title: 'My Messages', sub: 'Inbox' }
};
