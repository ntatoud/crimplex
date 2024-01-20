import { FC, PropsWithChildren } from 'react';

import { LucideIcon, User } from 'lucide-react';
import Link, { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

import { ACCOUNT_NAV_ITEMS } from './config';

interface AccountNavItemProps extends LinkProps {
  href: string;
  icon: LucideIcon;
}
const AccountNavItem: FC<PropsWithChildren<AccountNavItemProps>> = ({
  href,
  icon: Icon,
  children,
  ...props
}) => {
  const pathname = usePathname();

  const isActive = pathname.endsWith(href);

  return (
    <Link
      className={cn(
        'flex items-center gap-3 rounded-lg px-3 py-2 text-gray-700  transition-all hover:text-gray-900  dark:text-gray-300 dark:hover:text-gray-50',
        isActive
          ? 'text-gray-900 bg-gray-100 dark:text-gray-50 dark:bg-gray-800'
          : ''
      )}
      href={href}
      {...props}
    >
      <Icon className="h-4 w-4" />
      {children}
    </Link>
  );
};
const AccountNav = () => {
  return (
    <div className="flex h-full max-h-screen flex-col gap-2">
      <div className="flex h-[60px] items-center border-b px-6">
        <Link className="flex items-center gap-2 font-semibold" href="#">
          <User className="h-6 w-6" />
          <span>User Account</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-4 text-sm font-medium">
          {ACCOUNT_NAV_ITEMS.map((navItem) => (
            <AccountNavItem
              key={navItem.value}
              href={navItem.href}
              icon={navItem.icon}
            >
              {navItem.label}
            </AccountNavItem>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default AccountNav;
