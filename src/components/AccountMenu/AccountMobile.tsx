import { User2 } from "lucide-react";
import Link from "next/link";

import { trpc } from "@/lib/trpc/client";

import { getFileUrl } from "@/lib/uploadthing/client";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
	AccountMenuErrorState,
	AccountMenuLoadingState,
} from "./AccountMenuState";

const AccountMobilePublic = () => (
	<Link href="/login">
		<Avatar className="hover:cursor-pointer">
			<AvatarFallback className="uppercase">
				<User2 />
			</AvatarFallback>
		</Avatar>
	</Link>
);

const AccountMobileLogged = () => {
	const pathname = usePathname();
	const {
		data: account,
		isLoading: isAccountLoading,
		isSuccess: isAccountSuccess,
	} = trpc.account.get.useQuery();

	if (isAccountLoading) return <AccountMenuLoadingState />;

	if (isAccountSuccess && !account) return <AccountMenuErrorState />;

	return (
		<Link href="/account">
			<Avatar
				className={
					pathname.startsWith("account")
						? " outline-gray-900 dark:outline-gray-100 outline-double outline-2 outline-offset-2"
						: ""
				}
			>
				<AvatarImage src={getFileUrl(account?.profilePictureKey)} alt="PP" />
				<AvatarFallback className="uppercase">
					{account?.name[0] ?? account?.email[0] ?? <User2 />}
				</AvatarFallback>
			</Avatar>
		</Link>
	);
};

export const AccountMobile = () => {
	const { data: isAuth, isLoading } = trpc.auth.isAuth.useQuery();

	if (isLoading) return <AccountMenuLoadingState />;

	if (!isAuth?.status) return <AccountMobilePublic />;

	return <AccountMobileLogged />;
};
