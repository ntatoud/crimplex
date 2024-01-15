import { FC, PropsWithChildren } from 'react';

import { User } from 'lucide-react';

import { trpc } from '@/lib/trpc/client';
import { cn } from '@/lib/utils';

import NavItem from './NavItem';
import NavItems from './NavItems';

const NavbarMobile: FC<PropsWithChildren & { className?: string }> = ({
  className,
}) => {
  const { data: account } = trpc.account.get.useQuery();
  return (
    <nav
      className={cn(
        'w-full h-20 py-2 text-sm px-2 fixed bottom-0 items-start justify-between border-t-2 bg-white border-slate-300 dark:border-slate-800 dark:bg-black',
        className
      )}
    >
      <NavItems />

      <NavItem href={account ? '/account' : '/login'} icon={<User />}>
        {account ? account.name : 'Connect'}
      </NavItem>
    </nav>
  );
};

export default NavbarMobile;
