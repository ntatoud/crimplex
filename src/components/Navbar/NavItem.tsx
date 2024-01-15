import { ReactNode } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

const NavItem = ({
  children,
  icon,
  href,
}: {
  children: ReactNode;
  icon: ReactNode;
  href: string;
}) => {
  const isActive = href === usePathname();

  return (
    <Link
      href={href}
      className={cn(
        'flex flex-col items-center p-2 gap-2 md:gap-1 md:flex-row text-end',
        isActive
          ? 'text-black font-bold dark:text-white'
          : 'text-slate-500 font-semibold dark:text-slate-400'
      )}
    >
      <div className="scale-125 md:scale-100">{icon}</div>
      <div className="mb-[-0.2rem]">{children}</div>
    </Link>
  );
};

export default NavItem;
