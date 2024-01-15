import { GuardGuestOnly } from '@/features/auth/guard/GuardGuestOnly';

export default function AppGuestOnlyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <GuardGuestOnly>{children}</GuardGuestOnly>;
}
