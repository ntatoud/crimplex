import NavbarDesktop from '@/components/Navbar/NavbarDesktop';
import NavbarMobile from '@/components/Navbar/NavbarMobile';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavbarDesktop />
      <main className="flex flex-1 mb-24 md:mb-0">{children}</main>
      <NavbarMobile className="flex md:hidden" />
    </>
  );
}
