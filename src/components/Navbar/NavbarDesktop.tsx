"use client";

import { FC } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

import AccountMenu from "../AccountMenu";
import Logo from "../Icons/Logo";
import LogoIcon from "../Icons/LogoIcon";
import MaxWidthWrapper from "../MaxWidthWrapper";
import ColorModeToggle from "./ColorModeToggle";
import NavItems from "./NavItems";

const NavbarDesktop: FC<{ className?: string }> = ({ className }) => {
	const pathname = usePathname();

	return (
		<header className="border-b-2 dark:shadow-slate-800">
			<MaxWidthWrapper>
				<div
					key={pathname}
					className={cn(
						"relative flex w-full h-15 my-2 items-center justify-end md:content-between",
						className,
					)}
				>
					<div className="hidden flex-1 items-center justify-center md:justify-start gap-5 md:flex">
						<Link href="/" className="items-end ">
							<Logo height={30} width={120} />
						</Link>
						<nav className="hidden md:flex">
							<NavItems />
						</nav>
					</div>
					<div className="absolute top-0 left-1/2 -translate-x-1/2 z-0 md:hidden">
						<Link href="/" className="items-end">
							<LogoIcon height={35} width={35} />
						</Link>
					</div>

					<div className="flex gap-2 z-10">
						<div className="hidden md:flex items-center">
							<ColorModeToggle />
						</div>
						<AccountMenu />
					</div>
				</div>
			</MaxWidthWrapper>
		</header>
	);
};

export default NavbarDesktop;
