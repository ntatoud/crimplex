import useBreakpoints from "@/hooks/useBreakpoints";

import AccountDropdown from "./AccountDropdown";
import { AccountSheet } from "./AccountSheet";

const AccountMenu = () => {
	const isMobile = useBreakpoints({ below: "md" });
	return isMobile ? <AccountSheet /> : <AccountDropdown />;
};

export default AccountMenu;
