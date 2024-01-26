import { LogOut, Shield, User, User2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useOnLogout from "@/features/auth/logout/useOnLogout";
import { trpc } from "@/lib/trpc/client";

import { getFileUrl } from "@/lib/uploadthing/client";
import {
	AccountMenuErrorState,
	AccountMenuLoadingState,
} from "../AccountMenu/AccountMenuState";
import { buttonVariants } from "../ui/button";

const AccountDropdownPublic = () => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger className="hover:cursor-pointer" asChild>
				<Avatar>
					<AvatarFallback className="uppercase">
						<User2 />
					</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-48">
				<DropdownMenuLabel>My account</DropdownMenuLabel>
				<DropdownMenuGroup className="flex flex-col gap-2 p-1">
					<Link className="h-full w-full text-center" href="/login">
						<DropdownMenuItem
							className={buttonVariants({
								variant: "secondary",
								className: "w-full hover:cursor-pointer",
							})}
						>
							Connect
						</DropdownMenuItem>
					</Link>
					<Link className="h-full w-full text-center" href="/register">
						<DropdownMenuItem
							className={buttonVariants({
								className: "w-full hover:cursor-pointer",
							})}
						>
							Create account
						</DropdownMenuItem>
					</Link>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

const AccountDropdownLogged = () => {
	const pathname = usePathname();
	const {
		data: account,
		isLoading: isAccountLoading,
		isSuccess: isAccountSuccess,
	} = trpc.account.get.useQuery();
	const { mutate: userLogout } = useOnLogout({});

	if (isAccountLoading) return <AccountMenuLoadingState />;

	if (isAccountSuccess && !account) return <AccountMenuErrorState />;

	return (
		<DropdownMenu>
			<DropdownMenuTrigger className="hover:cursor-pointer" asChild>
				<Avatar
					className={
						pathname.startsWith("account")
							? "outline-double outline-2 outline-offset-2 outline-gray-900 dark:outline-gray-100"
							: ""
					}
				>
					<AvatarImage src={getFileUrl(account?.profilePictureKey)} alt="PP" />
					<AvatarFallback className="uppercase">
						{account?.name[0] ?? account?.email[0] ?? <User2 />}
					</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-40">
				<DropdownMenuLabel>My Account</DropdownMenuLabel>
				{account?.authorizations.includes("admin") && (
					<>
						<DropdownMenuItem>
							<Link href="/admin" className="flex flex-1 items-center">
								<Shield className="mr-2 h-4 w-4" />
								<span>Admin</span>
							</Link>
						</DropdownMenuItem>
						<DropdownMenuSeparator />
					</>
				)}
				<DropdownMenuGroup>
					<DropdownMenuItem>
						<Link href="/account" className="flex flex-1 items-center">
							<User className="mr-2 h-4 w-4" />
							<span>Profile</span>
						</Link>
					</DropdownMenuItem>
					<DropdownMenuItem
						onClick={() => userLogout()}
						className="text-red-600 hover:cursor-pointer dark:text-red-400"
					>
						<LogOut className="mr-2 h-4 w-4" />
						<span>Log out</span>
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

const AccountDropdown = () => {
	const { data: isAuth, isLoading } = trpc.auth.isAuth.useQuery();

	if (isLoading) return <AccountMenuLoadingState />;

	if (!isAuth?.status) return <AccountDropdownPublic />;

	return <AccountDropdownLogged />;
};

export default AccountDropdown;
