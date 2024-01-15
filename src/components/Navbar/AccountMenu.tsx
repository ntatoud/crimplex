import { Loader2, LogOut, Shield, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { trpc } from '@/lib/trpc/client';
import { cn } from '@/lib/utils';

const AccountMenu = () => {
  const trpcUtils = trpc.useUtils();
  const { data: account, isLoading: isAccountLoading } =
    trpc.account.get.useQuery();
  const router = useRouter();
  const pathname = usePathname();
  const { mutate: userLogout } = trpc.auth.logout.useMutation({
    onSuccess: () => {
      trpcUtils.auth.isAuth.setData(undefined, { status: false });
      router.push('/login');
      toast.success('Success', {
        description: 'Logged out',
      });
    },
  });

  return (
    <div className="hidden md:block">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar
            className={cn(
              'hover:cursor-pointer',
              pathname.includes('account')
                ? ' outline-gray-900 dark:outline-gray-100 outline-double outline-2 outline-offset-2'
                : ''
            )}
          >
            <AvatarImage src="" alt="PP" />
            <AvatarFallback className="uppercase">
              {isAccountLoading ? (
                <Loader2 className="animate-spin" />
              ) : (
                account?.name[0] ?? account?.email[0]
              )}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>

          {account?.authorizations.includes('admin') && (
            <>
              <DropdownMenuItem>
                <Link href="/admin" className="flex flex-1 items-center">
                  <Shield className="mr-2 h-4 w-4" />
                  <span>Admin</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </>
          )}

          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Link href="/account" className="flex flex-1 items-center">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => userLogout()}
              className="hover:cursor-pointer text-red-600 dark:text-red-400"
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default AccountMenu;
