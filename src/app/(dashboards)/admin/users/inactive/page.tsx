'use client';
import UsersListPage from '../list/page';

export default function InactiveUsersPage() {
  return <UsersListPage preFilterStatus="Inactive" />;
}
