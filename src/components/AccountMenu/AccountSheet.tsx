import { LogOut, Shield, User2 } from 'lucide-react';
import Link from 'next/link';

import useOnLogout from '@/features/auth/logout/useOnLogout';
import { trpc } from '@/lib/trpc/client';

import { Avatar, AvatarFallback } from '../ui/avatar';
import { Button, buttonVariants } from '../ui/button';
import { Separator } from '../ui/separator';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet';
import {
  AccountMenuErrorState,
  AccountMenuLoadingState,
} from './AccountMenuState';

const AccountSheetPublic = () => (
  <Sheet>
    <SheetTrigger asChild>
      <Avatar className="hover:cursor-pointer">
        <AvatarFallback className="uppercase">
          <User2 />
        </AvatarFallback>
      </Avatar>
    </SheetTrigger>
    <SheetContent>
      <SheetHeader>
        <SheetTitle>My account</SheetTitle>
      </SheetHeader>
      <div className="flex flex-col gap-4 mt-5">
        <SheetClose asChild>
          <Link
            href="/login"
            className={buttonVariants({
              variant: 'secondary',
              className: 'w-full hover:cursor-pointer',
            })}
          >
            Connect
          </Link>
        </SheetClose>
        <SheetClose asChild>
          <Link
            href="/register"
            className={buttonVariants({
              className: 'w-full hover:cursor-pointer',
            })}
          >
            Create account
          </Link>
        </SheetClose>
      </div>
    </SheetContent>
  </Sheet>
);

const AccountSheetLogged = () => {
  const {
    data: account,
    isLoading: isAccountLoading,
    isSuccess: isAccountSuccess,
  } = trpc.account.get.useQuery();
  const { mutate: userLogout } = useOnLogout({});

  if (isAccountLoading) return <AccountMenuLoadingState />;

  if (isAccountSuccess && !account) return <AccountMenuErrorState />;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Avatar className="hover:cursor-pointer">
          <AvatarFallback className="uppercase">
            <User2 />
          </AvatarFallback>
        </Avatar>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>My account</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-4 mt-5">
          {account?.authorizations.includes('admin') && (
            <>
              <Link href="/admin" className="flex flex-1 items-center">
                <Shield className="mr-2 h-4 w-4" />
                <span>Admin</span>
              </Link>
              <Separator />
            </>
          )}
          <SheetClose asChild>
            <Link href="/account" className="flex flex-1 items-center">
              My profile
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Button onClick={() => userLogout()} variant="destructiveSecondary">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </Button>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export const AccountSheet = () => {
  const { data: isAuth, isLoading } = trpc.auth.isAuth.useQuery();

  if (isLoading) return <AccountMenuLoadingState />;

  if (!isAuth?.status) return <AccountSheetPublic />;

  return <AccountSheetLogged />;
};
