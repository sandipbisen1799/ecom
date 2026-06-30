'use client';

import UserShell from '@/components/user/UserShell';
import '../dashboards.css';

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return <UserShell>{children}</UserShell>;
}
