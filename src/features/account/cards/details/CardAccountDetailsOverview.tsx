import { FC } from "react";

import dayjs from "dayjs";

import { CardAccountProps } from "../types";

const CardAccountDetailsOverview: FC<CardAccountProps> = ({ account }) => {
	return (
		<div className="grid gap-2">
			<div className="flex flex-col">
				<div className="font-semibold text-lg">{account.name}</div>
				<span className="text-sm w-40 text-muted-foreground">
					Joined in {dayjs(account?.creationDate).format("MMMM YYYY")}
				</span>
			</div>
			<div className="text-md text-gray-800 dark:text-gray-200">
				{account.email}
			</div>
		</div>
	);
};

export default CardAccountDetailsOverview;
