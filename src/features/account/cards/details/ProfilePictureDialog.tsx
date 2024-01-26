import { FC } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

import { getFileUrl } from "@/lib/uploadthing/client";
import { UserAccount } from "@/server/config/schemas/Account";
import { Camera, LucideIcon } from "lucide-react";
import ProfilePictureUpdate from "./ProfilePictureUpdate";

interface FieldProfilePictureProps {
	account: UserAccount;
	imageSrc?: string;
	fallback: string | LucideIcon;
}

const ProfilePictureDialog: FC<FieldProfilePictureProps> = ({
	account,
	fallback,
}) => {
	const Fallback =
		typeof fallback === "string" ? () => <p>{fallback}</p> : fallback;

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Avatar className="relative group h-20 w-20 hover:cursor-pointer">
					<AvatarImage
						alt="User Avatar"
						src={getFileUrl(account?.profilePictureKey)}
					/>
					<AvatarFallback className="text-lg uppercase">
						<Fallback />
					</AvatarFallback>
					<div
						aria-label="Profile picture edit"
						className="absolute rounded-full flex bottom-0 items-center justify-center w-full h-8 opacity-25 group-hover:opacity-100 bg-gray-500/50"
					>
						<Camera className="h-5 w-5" />
					</div>
				</Avatar>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Profile picture</DialogTitle>
					<Avatar className="group border border-input h-40 w-40 place-self-center">
						<AvatarImage
							alt="User Avatar"
							src={getFileUrl(account?.profilePictureKey)}
						/>
						<AvatarFallback className="relative text-lg uppercase">
							<Fallback />
						</AvatarFallback>
					</Avatar>
				</DialogHeader>
				<div className="flex flex-1 flex-col items-center gap-2">
					<ProfilePictureUpdate />
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default ProfilePictureDialog;
