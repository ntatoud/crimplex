import { FC } from "react";

import { ExternalLink } from "lucide-react";
import Link from "next/link";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { buttonVariants } from "@/components/ui/button";

const AdminAlert: FC = () => {
	return (
		<MaxWidthWrapper className="my-4">
			<Alert className="w-fit text-left h-fit py-1 text-green-900 bg-green-500  bg-opacity-50 dark:text-green-100 ark:bg-opacity-25">
				<AlertTitle className="flex items-center my-1">
					Admin
					<Link
						href="/admin"
						className={buttonVariants({
							variant: "link",
							className: "h-10 text-green-900 dark:text-green-300 text-lg",
						})}
					>
						<ExternalLink className="h-5 w-5 pr-1" />
						Open Dashboard
					</Link>
				</AlertTitle>
			</Alert>
		</MaxWidthWrapper>
	);
};

export default AdminAlert;
