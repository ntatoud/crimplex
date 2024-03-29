import { Metadata } from "next";

import NavbarDesktop from "@/components/Navbar/NavbarDesktop";
import NavbarMobile from "@/components/Navbar/NavbarMobile";

export const metadata: Metadata = {
	title: "Crimplex",
	applicationName: "Crimplex",
	description: "Climbing has never been so easy.",
};
export default function AppLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<NavbarDesktop />
			<main className="flex flex-1 mb-20 md:mb-0">{children}</main>
			<NavbarMobile className="flex md:hidden z-10" />
		</>
	);
}
