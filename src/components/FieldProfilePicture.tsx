import { FC } from "react";

import { PopoverContent } from "@radix-ui/react-popover";
import { Camera, LucideIcon, Pencil, Trash } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Popover, PopoverTrigger } from "./ui/popover";

interface FieldProfilePictureProps {
	imageSrc?: string;
	fallback: string | LucideIcon;
}

const FieldProfilePicture: FC<FieldProfilePictureProps> = ({
	imageSrc,
	fallback,
}) => {
	// TODO Generalize this component
	// TODO implement the actual image upload logic

	const Fallback =
		typeof fallback === "string" ? () => <p>{fallback}</p> : fallback;
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Avatar className="group h-20 w-20 hover:cursor-pointer">
					<AvatarImage alt="User Avatar" src={imageSrc} />
					<AvatarFallback className="relative text-lg uppercase">
						<div
							aria-label="Profile picture edit"
							className="absolute rounded-full flex bottom-0 items-center justify-center w-full h-8 opacity-25 group-hover:opacity-100 bg-gray-500/50"
						>
							<Camera className="h-5 w-5" />
						</div>
						<Fallback />
					</AvatarFallback>
				</Avatar>
			</PopoverTrigger>
			<PopoverContent sideOffset={10}>
				<div className="flex flex-col p-4 gap-2 bg-background border rounded-lg border-muted">
					<h3>Profile picture</h3>
					<div className="flex flex-1 items-center gap-2">
						<Button>
							<Pencil className="w-4 h-4 mr-1" />
							Edit
						</Button>
						<Button variant="destructiveSecondary">
							<Trash className="w-4 h-4 mr-1" />
							Delete
						</Button>
					</div>
				</div>
			</PopoverContent>
		</Popover>
	);
};

export default FieldProfilePicture;
