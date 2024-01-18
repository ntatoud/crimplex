'use client';

import { GuardAuth } from '@/features/auth/guard/GuardAuth';

export default function AppAuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <GuardAuth>{children}</GuardAuth>;
}
