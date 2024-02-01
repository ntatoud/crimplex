import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import FieldFileUpload from "@/components/uploadthing/FieldFileUpload";
import { trpc } from "@/lib/trpc/client";
import { MAX_SPOT_IMAGES } from "@/lib/uploadthing/constants";
import { cn } from "@/lib/utils";
import { Marker } from "@/server/config/schemas/Marker";
import { ImagePlus } from "lucide-react";
import { useState } from "react";

export const SpotImagesAdd = ({
	size,
	marker,
}: { size: "small" | "large"; marker: Marker }) => {
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const trpcUtils = trpc.useUtils();
	const { mutate: addPictures } = trpc.markers.addPicturesKeys.useMutation({
		onSuccess: () => {
			trpcUtils.markers.invalidate();
			setIsDialogOpen(false);
		},
	});

	return (
		<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
			<DialogTrigger asChild>
				<span
					tabIndex={0}
					className={cn(
						"relative group flex flex-col gap-1 items-center justify-center aspect-square rounded-lg cursor-pointer",
						"focus-visible:ring focus-visible:ring-ring focus-visible:outline-none",
						"hover:bg-muted-foreground/5",
						size === "small" ? "w-40" : "w-60",
					)}
				>
					<ImagePlus className="text-muted-foreground group-hover:scale-125 transition-all" />
					Add more
				</span>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Awesome! More images for your spot! </DialogTitle>
				</DialogHeader>
				<FieldFileUpload
					error={
						<span className="flex items-center">
							Please make sure to provide only
							<p className="font-bold mx-1 underline">images</p>
							and at most
							<p className="font-bold mx-1 underline">{MAX_SPOT_IMAGES}</p>.
						</span>
					}
					mode="multiple"
					endpoint="spotPictures"
					onUpload={(keys: string[]) => {
						addPictures({
							id: marker.id,
							keys,
						});
					}}
				/>
			</DialogContent>
		</Dialog>
	);
};
