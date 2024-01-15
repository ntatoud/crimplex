'use client';

import { BookMarked, Home } from 'lucide-react';

import NavItem from './NavItem';

const NavItems = () => {
  return (
    <div className="flex flex-1 justify-evenly items-start md:gap-5 md:items-center">
      <NavItem href="/" icon={<Home />}>
        Home
      </NavItem>

      <NavItem href="/about" icon={<BookMarked />}>
        About
      </NavItem>
    </div>
  );
};

export default NavItems;
