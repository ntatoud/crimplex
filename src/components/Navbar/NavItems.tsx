"use client";

import { BookMarked, Home, Map } from "lucide-react";

import NavItem from "./NavItem";

const NavItems = () => {
	return (
		<div className="flex justify-center items-start md:flex-1 md:gap-5 md:items-center">
			<NavItem href="/" icon={<Home />}>
				Home
			</NavItem>

			<NavItem href="/about" icon={<BookMarked />}>
				About
			</NavItem>

			<NavItem href="/map" icon={<Map />}>
				Map
			</NavItem>
		</div>
	);
};

export default NavItems;
