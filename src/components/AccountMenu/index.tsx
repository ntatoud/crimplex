import useBreakpoints from "@/hooks/useBreakpoints";

import AccountDropdown from "./AccountDropdown";
import { AccountMobile } from "./AccountMobile";

const AccountMenu = () => {
	const isMobile = useBreakpoints({ below: "md" });
	return isMobile ? <AccountMobile /> : <AccountDropdown />;
};

export default AccountMenu;
