'use client';

import { FC, useId } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { trpc } from '@/lib/trpc/client';
import { cn } from '@/lib/utils';

import Logo from '../Icons/Logo';
import MaxWidthWrapper from '../MaxWidthWrapper';
import { buttonVariants } from '../ui/button';
import AccountMenu from './AccountMenu';
import { ColorModeToggle } from './ColorModeToggle';
import NavItems from './NavItems';

const NavbarDesktop: FC<{ className?: string }> = ({ className }) => {
  const trpcUtils = trpc.useUtils();
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

          <div className="gap-2 hidden md:flex" key={id}>
            <ColorModeToggle />
            {trpcUtils.auth.isAuth.getData()?.status ? (
              <AccountMenu />
            ) : (
              <div className="flex gap-1">
                <Link
                  className={cn(
                    buttonVariants({ variant: 'secondary' }),
                    'outline outline-1 outline-slate-300 dark:outline-slate-700'
                  )}
                  href="/login"
                >
                  Connect
                </Link>
                <Link className={buttonVariants()} href="/register">
                  Create account
                </Link>
              </div>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </header>
  );
};

export default NavbarDesktop;
