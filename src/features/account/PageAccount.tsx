import { ArrowRight, CheckCheck, LogOut } from "lucide-react";

import { LoaderFull } from "@/components/LoaderFull";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { trpc } from "@/lib/trpc/client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from "next/link";
import useOnLogout from "../auth/logout/useOnLogout";
import AccountNav from "./AccountNav";
import CardAccountSettings from "./cards/CardAccountSettings";
import CardAccountDetails from "./cards/details/CardAccountDetails";

const PageAccount = () => {
	const { data: account } = trpc.account.get.useQuery();
	const { mutate: userLogout, isLoading } = useOnLogout({});

	if (!account) return <LoaderFull />;

	return (
		<MaxWidthWrapper>
			<div className="grid min-h-screen w-full overflow-hidden lg:grid-cols-[280px_1fr]">
				<div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
					<AccountNav />
				</div>
				<div className="flex flex-col">
					{account.authorizations.includes("admin") && (
						<Alert variant="primary" className="m-4 md:m-6 w-fit">
							<CheckCheck className="w-4 h-4" />
							<AlertTitle>Admin account</AlertTitle>
							<AlertDescription>
								<Link
									className="group flex items-center underline text-lg"
									href="/admin/dashboard"
								>
									Go to dashboard
									<ArrowRight className="visible md:invisible group-hover:visible transition-all w-5 h-5 ml-1 group-hover:animate-in group-hover:zoom-in-0 group-hover:slide-in-from-left-5" />
								</Link>
							</AlertDescription>
						</Alert>
					)}
					<div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
						<div className="flex items-center gap-4">
							<h1 className="font-semibold text-lg md:text-xl">User Profile</h1>
						</div>
						<div className="flex flex-col">
							<div className="flex flex-col gap-6">
								<CardAccountDetails account={account} />
								<CardAccountSettings account={account} />
							</div>
						</div>
						<Separator />

						<Button
							variant="destructiveSecondary"
							className="place-self-end md:w-1/4"
							onClick={() => userLogout()}
							isLoading={isLoading}
						>
							<LogOut className="h-5 w-5 mr-1" />
							Log out
						</Button>
					</div>
				</div>
			</div>
		</MaxWidthWrapper>
	);
};

export default PageAccount;
