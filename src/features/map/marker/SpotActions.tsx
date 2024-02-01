import { buttonVariants } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { env } from "@/env.mjs";
import { trpc } from "@/lib/trpc/client";
import { Marker } from "@/server/config/schemas/Marker";
import { User } from "@/server/config/schemas/User";
import { Check, Copy, MoreVertical, Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const SpotActions = ({ marker, author }: { marker: Marker; author?: User }) => {
	const { id } = marker;
	const spotLink = `${env.NEXT_PUBLIC_BASE_URL}/map?marker=${marker.id}`;

	const [isJustCopied, setIsJustCopied] = useState(false);

	const trpcUtils = trpc.useUtils();
	const account = trpc.account.get.useQuery();

	const { mutate: markerDelete, isLoading: isDeleteLoading } =
		trpc.markers.deleteById.useMutation({
			onSuccess: (data) => {
				toast.success("Spot Deleted", {
					description: `Spot ${data.name} deleted successfully`,
				});
				trpcUtils.markers.invalidate();
			},
			onError: () => {
				toast.error("Could not delete the spot", {
					description: "An error occured while deleting the spot",
				});
			},
		});

	const canDelete =
		author?.id === account.data?.id ||
		account.data?.authorizations.includes("admin");
	return (
		<DropdownMenu>
			<Tooltip open={isJustCopied} onOpenChange={setIsJustCopied}>
				<DropdownMenuTrigger
					className={buttonVariants({
						variant: "ghost",
						size: "icon",
						className: "h-7 w-7",
					})}
				>
					{isJustCopied ? (
						<TooltipTrigger asChild>
							<Check className="w-6 h-6 text-green-600 animate-out fade-out-0 delay-1000 duration-1000 " />
						</TooltipTrigger>
					) : (
						<MoreVertical className="w-5 h-5 text-foreground animate-in fade-in-0 duration-300" />
					)}
				</DropdownMenuTrigger>
				<TooltipContent side="top">
					<p className="text-green-600">Copied !</p>
				</TooltipContent>
			</Tooltip>
			<DropdownMenuContent>
				<DropdownMenuGroup>
					<DropdownMenuItem
						className="cursor-pointer"
						onClick={() => {
							navigator.clipboard.writeText(spotLink);
							setIsJustCopied(true);
							setTimeout(() => {
								setIsJustCopied(false);
							}, 1800);
						}}
					>
						<Copy className="h-4 w-4 mr-1" /> Copy link
					</DropdownMenuItem>

					{canDelete && (
						<DropdownMenuItem
							className="text-red-500 hover:text-red-700 cursor-pointer"
							onClick={() =>
								markerDelete({
									id,
								})
							}
						>
							<Trash className="w-4 h-4 mr-1" /> Delete
						</DropdownMenuItem>
					)}
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default SpotActions;
