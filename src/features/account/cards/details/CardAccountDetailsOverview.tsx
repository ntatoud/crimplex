import { FC } from "react";

import dayjs from "dayjs";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CardContent } from "@/components/ui/card";

import { CardAccountProps } from "../types";

const CardAccountDetailsOverview: FC<CardAccountProps> = ({ account }) => {
	return (
		<CardContent>
			<div className="flex items-start gap-7">
				<Avatar className="h-20 w-20">
					<AvatarImage alt="User Avatar" src="" />
					<AvatarFallback className="text-lg uppercase">
						{account.name.split(" ").map((word) => word[0]) ?? account.email}
					</AvatarFallback>
				</Avatar>
				<div className="grid gap-2">
					<div className="flex flex-col">
						<div className="font-semibold text-lg">{account.name}</div>
						<span className="text-sm text-muted-foreground">
							Joined in {dayjs(account?.creationDate).format("MMMM YYYY")}
						</span>
					</div>
					<div className="text-md text-gray-800 dark:text-gray-200">
						{account.email}
					</div>
				</div>
			</div>
		</CardContent>
	);
};

export default CardAccountDetailsOverview;
