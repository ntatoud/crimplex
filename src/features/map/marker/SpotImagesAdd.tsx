import { Button } from "@/components/ui/button";
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
import { Marker } from "@/server/config/schemas/Marker";
import { ImagePlus } from "lucide-react";
import { useState } from "react";

export const SpotImagesAdd = ({ marker }: { marker: Marker }) => {
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const trpcUtils = trpc.useUtils();
	const account = trpc.account.get.useQuery();
	const canAddImages =
		account.data?.id === marker.createdById &&
		marker.picturesKeys.length < MAX_SPOT_IMAGES;

	const { mutate: addPictures } = trpc.markers.addPicturesKeys.useMutation({
		onSuccess: () => {
			trpcUtils.markers.invalidate();
			setIsDialogOpen(false);
		},
	});

	if (!canAddImages) return;

	return (
		<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
			<DialogTrigger asChild>
				<Button size="sm" variant="outline">
					<ImagePlus className="text-muted-foreground text-lg h-5 w-5 mr-1" />
					Add more
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:min-w-fit">
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
