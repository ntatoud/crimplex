"use client";

import { BookMarked, Dumbbell, Home, Map } from "lucide-react";

import WorkInProgressWrapper from "../utils/WorkInProgress";
import NavItem from "./NavItem";

const NavItems = () => {
	return (
		<div className="flex justify-center items-start md:flex-1 md:gap-5 md:items-center">
			<NavItem href="/" icon={<Home />}>
				Home
			</NavItem>

			<WorkInProgressWrapper>
				<NavItem href="/about" icon={<BookMarked />}>
					About
				</NavItem>
			</WorkInProgressWrapper>

			<NavItem href="/map" icon={<Map />}>
				Map
			</NavItem>

			<NavItem href="/training" icon={<Dumbbell />}>
				Training
			</NavItem>
		</div>
	);
};

export default NavItems;
