import { FC, PropsWithChildren } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

import NavItems from './NavItems';

const NavbarMobile: FC<PropsWithChildren & { className?: string }> = ({
  className,
}) => {
  return (
    <nav
      className={cn(
        'w-full h-20 py-2 text-sm px-2 fixed bottom-0 items-start justify-between border-t-2 bg-white border-slate-300 dark:border-slate-800 dark:bg-black',
        className
      )}
    >
      <NavItems />
      <div className="w-1/4">
        <Avatar className="flex pt-1">
          <AvatarImage src="" alt="PP" />
          <AvatarFallback>A</AvatarFallback>
        </Avatar>
      </div>
    </nav>
  );
};

export default NavbarMobile;
