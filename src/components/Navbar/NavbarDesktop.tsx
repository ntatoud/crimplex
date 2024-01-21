'use client';

import { FC, useId } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

import AccountMenu from '../AccountMenu';
import Logo from '../Icons/Logo';
import MaxWidthWrapper from '../MaxWidthWrapper';
import { ColorModeToggle } from './ColorModeToggle';
import NavItems from './NavItems';

const NavbarDesktop: FC<{ className?: string }> = ({ className }) => {
  const pathname = usePathname();

  const id = useId();

  return (
    <header className="border-b-2 dark:shadow-slate-800">
      <MaxWidthWrapper>
        <div
          key={pathname}
          className={cn(
            'flex w-full h-15 my-2 items-center md:content-between',
            className
          )}
        >
          <div className="flex flex-1 items-center justify-center md:justify-start gap-5">
            <Link href="/" className="flex items-end">
              <Logo height={30} width={120} />
            </Link>

            <nav className="hidden md:flex">
              <NavItems />
            </nav>
          </div>

          <div className="flex gap-2" key={id}>
            <ColorModeToggle />
            <AccountMenu />
          </div>
        </div>
      </MaxWidthWrapper>
    </header>
  );
};

export default NavbarDesktop;
