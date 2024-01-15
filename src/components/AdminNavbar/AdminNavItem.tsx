import { FC, PropsWithChildren } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface AdminNavItemProps extends PropsWithChildren {
  href: string;
}

const AdminNavItem: FC<AdminNavItemProps> = ({ href, children }) => {
  const pathname = usePathname();
  const isActive = pathname.includes(href);
  return (
    <Link
      href={href}
      className={isActive ? 'opacity-100 font-bold' : 'opacity-80'}
    >
      {children}
    </Link>
  );
};

export default AdminNavItem;
