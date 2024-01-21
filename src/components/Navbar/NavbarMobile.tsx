'use client';

import { FC, PropsWithChildren } from 'react';

import { cn } from '@/lib/utils';

import NavItems from './NavItems';

const NavbarMobile: FC<PropsWithChildren & { className?: string }> = ({
  className,
}) => {
  return (
    <nav
      className={cn(
        'w-full h-20 py-2 text-sm px-2 fixed bottom-0 items-start justify-center border-t-2 bg-white border-slate-300 dark:border-slate-800 dark:bg-black',
        className
      )}
    >
      <NavItems />
    </nav>
  );
};

export default NavbarMobile;
