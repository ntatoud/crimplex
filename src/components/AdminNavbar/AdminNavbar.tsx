'use client';

import { FC } from 'react';

import { ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

import Logo from '../Icons/Logo';
import MaxWidthWrapper from '../MaxWidthWrapper';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { buttonVariants } from '../ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import AdminNavDrawer from './AdminNavDrawer';
import AdminNavItem from './AdminNavItem';

const AdminNavbar: FC<{ className?: string }> = ({ className }) => {
  const pathname = usePathname();

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
          <div className="flex flex-1 items-center justify-start gap-10">
            <Link href="/admin" className="flex items-end h-full">
              <Logo width={40} height={40} />
              <div className="relative flex items-end h-11">
                <div className="font-bold uppercase">Crimplex</div>
                <Badge
                  variant="default"
                  className="absolute text-xs top-0 left-0 py-0.5 px-1 ml-[-0.5rem] opacity-75"
                >
                  Admin
                </Badge>
              </div>
            </Link>
            <div className="hidden gap-4 text-lg md:flex">
              <AdminNavItem href="/admin/dashboard">Dashboard</AdminNavItem>
              <AdminNavItem href="/admin/manager">Manager</AdminNavItem>
              <AdminNavItem href="/admin/api">API Documentation</AdminNavItem>
            </div>
          </div>

          <div className="flex ml-auto gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/"
                  className={buttonVariants({
                    variant: 'outline',
                    className:
                      'bg-green-200 bg-opacity-50 px-1 dark:bg-green-900 hover:bg-opacity-100 hover:brightness-110',
                  })}
                >
                  <ExternalLink className="pr-1" />
                  APP
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Leave Admin menu</p>
              </TooltipContent>
            </Tooltip>

            <Link href="/admin/account">
              <Avatar
                className={
                  pathname.includes('account')
                    ? ' outline-gray-900 dark:outline-gray-100 outline-double outline-2 outline-offset-2'
                    : ''
                }
              >
                <AvatarImage src="" />
                <AvatarFallback className="bg-orange-900">A</AvatarFallback>
              </Avatar>
            </Link>

            <div className="flex md:hidden">
              <AdminNavDrawer />
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </header>
  );
};

export default AdminNavbar;
