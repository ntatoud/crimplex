'use client';

import AdminAlert from '@/features/admin/AdminAlert';
import { GuardAuth } from '@/features/auth/guard/GuardAuth';
import { trpc } from '@/lib/trpc/client';

export default function AppAuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: account } = trpc.account.get.useQuery();

  return (
    <GuardAuth>
      {account?.authorizations.includes('admin') && <AdminAlert />}
      {children}
    </GuardAuth>
  );
}
