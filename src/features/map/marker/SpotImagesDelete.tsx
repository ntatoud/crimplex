import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { trpc } from "@/lib/trpc/client";
import { getFileUrl } from "@/lib/uploadthing/client";
import { Marker } from "@/server/config/schemas/Marker";
import { ImageMinus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const SpotImagesDelete = ({ marker }: { marker: Marker }) => {
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [selectedImages, setSelectedImages] = useState<string[]>([]);
	const allSelected = selectedImages.length === marker.picturesKeys.length;

	const trpcUtils = trpc.useUtils();
	const account = trpc.account.get.useQuery();
	const { mutate: deletePictures, isLoading } =
		trpc.markers.deletePictures.useMutation({
			onSuccess: () => {
				trpcUtils.markers.invalidate();
				setIsDialogOpen(false);
				setSelectedImages([]);
			},
		});

	const canDeleteImages =
		account.data?.authorizations.includes("admin") ||
		marker.createdById === account.data?.id;

	if (marker.picturesKeys.length === 0 || !canDeleteImages) return;

	return (
		<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
			<DialogTrigger asChild>
				<Button size="sm" variant="destructiveSecondary">
					<ImageMinus className="text-lg h-5 w-5 mr-1" />
					Delete some
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Edit your spot's images</DialogTitle>
					<div className="flex gap-1 items-center">
						<Checkbox
							checked={allSelected}
							onClick={() =>
								allSelected
									? setSelectedImages([])
									: setSelectedImages(marker.picturesKeys)
							}
						/>
						Selected ({selectedImages.length})
					</div>
				</DialogHeader>
				<div className="flex flex-wrap w-full justify-center">
					{marker.picturesKeys.map((key) => {
						const isSelected = selectedImages.includes(key);

						return (
							<div
								key={key}
								className="relative flex items-center justify-center aspect-square border border-input rounded-lg h-40 cursor-pointer"
								onClick={() => {
									if (isSelected) {
										setSelectedImages(
											selectedImages.filter((imageKey) => imageKey !== key),
										);
									} else {
										setSelectedImages([key, ...selectedImages]);
									}
								}}
							>
								{isSelected && (
									<div className="absolute flex w-full h-full justify-center items-center bg-primary/50 z-10">
										selected
									</div>
								)}
								<Image
									src={getFileUrl(key)}
									alt={"Some picture of the spot"}
									fill
								/>
							</div>
						);
					})}
				</div>
				<DialogFooter>
					{!!selectedImages.length && (
						<Button
							variant="destructivePrimary"
							className="animate-in slide-in-from-bottom-5 fade-in-0"
							onClick={() =>
								deletePictures({
									id: marker.id,
									keys: selectedImages,
								})
							}
							isLoading={isLoading}
						>
							Delete selection
						</Button>
					)}
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default SpotImagesDelete;
