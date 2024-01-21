import dayjs from "dayjs";
import { PenLine, User } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { AccountDetailsViewProps } from "./AccountDetails";

const AccountDetailsOverview = ({
	account,
	changeView,
}: AccountDetailsViewProps) => {
	return (
		<div className="flex gap-2 md:flex-col">
			<div className="p-5">
				<Avatar className="w-32 h-32 md:w-52 md:h-52 ring-2 ring-offset-4 ring-zinc-800">
					<AvatarImage src="" />
					<AvatarFallback className="">
						<User className="w-16 h-16 md:w-32 md:h-32" />
					</AvatarFallback>
				</Avatar>
			</div>
			<div className="flex flex-col gap-2 flex-1">
				<div className="flex w-full justify-between items-center font-semibold text-2xl">
					{account?.name}
					<Button variant="secondary" size="icon" onClick={changeView}>
						<PenLine />
					</Button>
				</div>

				<span className="flex gap-1 text-sm text-muted-foreground">
					Member since{" "}
					<p className="font-semibold">
						{dayjs(account?.creationDate).format("MMMM YYYY")}
					</p>
				</span>
				<Separator />
				<div>
					<p className="py-2">{account?.email}</p>
				</div>
			</div>
		</div>
	);
};

export default AccountDetailsOverview;
