import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Crimplex - Admin',
  applicationName: 'Crimplex - Admin',
  description: 'Make climbing easy',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
