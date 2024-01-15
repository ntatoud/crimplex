import { Menu } from 'lucide-react';

import { Button } from '../ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet';
import AdminNavItem from './AdminNavItem';

const AdminNavDrawer = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Administration</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-2">
          <SheetClose asChild>
            <AdminNavItem href="/admin/dashboard">Dashboard</AdminNavItem>
          </SheetClose>
          <SheetClose asChild>
            <AdminNavItem href="/admin/manager">Manager</AdminNavItem>
          </SheetClose>
          <SheetClose asChild>
            <AdminNavItem href="/admin/api">API Documentation</AdminNavItem>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AdminNavDrawer;
