'use client';

import AdminShell from '@/components/admin/AdminShell';
import '../dashboards.css';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminShell>{children}</AdminShell>;
}
