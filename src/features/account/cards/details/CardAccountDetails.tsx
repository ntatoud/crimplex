import { FC, useState } from "react";

import { useAutoAnimate } from "@formkit/auto-animate/react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Toggle } from "@/components/ui/toggle";
import { Pencil, Undo } from "lucide-react";

import { CardAccountProps } from "../types";
import CardAccountDetailsForm from "./CardAccountDetailsForm";
import CardAccountDetailsOverview from "./CardAccountDetailsOverview";
import ProfilePictureDialog from "./ProfilePictureDialog";

const VIEWS: Record<
	"true" | "false",
	FC<CardAccountProps> | FC<CardAccountProps & { changeView: () => void }>
> = {
	false: CardAccountDetailsOverview,
	true: CardAccountDetailsForm,
} as const;
const CardAccountDetails: FC<CardAccountProps> = ({ account }) => {
	const [isEditMode, setIsEditMode] = useState(false);
	const [animationParent] = useAutoAnimate();

	const changeView = () => setIsEditMode((x) => !x);
	const CardContentView = VIEWS[isEditMode ? "true" : "false"];
	const ToggleIcon = isEditMode ? Undo : Pencil;
	return (
		<Card id="card-account-details">
			<CardHeader>
				<div className="flex flex-1 items-center">
					<CardTitle>Profile Information</CardTitle>
					<Toggle
						size="sm"
						className="text-xs ml-auto"
						variant="outline"
						onClick={changeView}
					>
						{isEditMode ? "Cancel" : "Edit"}
						<ToggleIcon className="w-4 h-4 ml-2" />
					</Toggle>
				</div>
			</CardHeader>
			<CardContent>
				<div className="flex items-start gap-4" ref={animationParent}>
					<ProfilePictureDialog
						account={account}
						fallback={
							account.name
								.split(" ")
								.map((word) => word[0])
								.join("") ?? account.email
						}
						imageSrc={`https://utfs.io/f/${account.profilePictureKey}`}
					/>
					<CardContentView account={account} changeView={changeView} />
				</div>
			</CardContent>
		</Card>
	);
};

export default CardAccountDetails;
