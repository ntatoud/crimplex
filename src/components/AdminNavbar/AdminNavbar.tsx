'use client';

import { FC } from 'react';

import { ExternalLink, Loader2, LogOut } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { trpc } from '@/lib/trpc/client';
import { cn } from '@/lib/utils';

import LogoAdmin from '../Icons/LogoAdmin';
import MaxWidthWrapper from '../MaxWidthWrapper';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button, buttonVariants } from '../ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import AdminNavDrawer from './AdminNavDrawer';
import AdminNavItem from './AdminNavItem';

const AdminNavbar: FC<{ className?: string }> = ({ className }) => {
  const pathname = usePathname();
  const trpcUtils = trpc.useUtils();
  const router = useRouter();
  const { mutate: userLogout, isLoading } = trpc.auth.logout.useMutation({
    onSuccess: () => {
      trpcUtils.auth.isAuth.setData(undefined, { status: false });
      router.push('/admin/login');
      toast.success('Success', {
        description: 'Logged out',
      });
    },
  });
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
            <Link href="/admin">
              <LogoAdmin width={200} height={30} />
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
            <Button
              variant="destructive"
              size="icon"
              onClick={() => userLogout()}
            >
              {isLoading ? <Loader2 className="animate-spin" /> : <LogOut />}
            </Button>
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
