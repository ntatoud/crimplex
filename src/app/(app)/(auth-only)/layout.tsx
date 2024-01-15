import AdminAlert from '@/features/admin/AdminAlert';
import { GuardAuth } from '@/features/auth/guard/GuardAuth';

export default function AppAuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <GuardAuth>
      <AdminAlert />
      {children}
    </GuardAuth>
  );
}
