import { Settings, User } from "lucide-react";

export const ACCOUNT_NAV_ITEMS = [
	{
		label: "Profile",
		value: "profile",
		href: "#card-account-details",
		icon: User,
	},
	{
		label: "Settings",
		value: "settings",
		href: "#card-account-settings",
		icon: Settings,
	},
];

export type AccountNavItem = (typeof ACCOUNT_NAV_ITEMS)[number];
