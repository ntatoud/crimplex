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
import { CheckCircle2, ImageMinus } from "lucide-react";
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
			},
		});

	const canDeleteImages =
		account.data?.authorizations.includes("admin") ||
		marker.createdById === account.data?.id;

	if (marker.picturesKeys.length === 0 || !canDeleteImages) return;

	return (
		<Dialog
			open={isDialogOpen}
			onOpenChange={(open) => {
				setIsDialogOpen(open);
				setSelectedImages([]);
			}}
		>
			<DialogTrigger asChild>
				<Button size="sm" variant="destructiveSecondary">
					<ImageMinus className="text-lg h-5 w-5 mr-1" />
					Delete some
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:min-w-fit">
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
						{allSelected ? "Unselect all" : "Select all"} (
						{selectedImages.length})
					</div>
				</DialogHeader>
				<div className="flex flex-wrap w-full justify-start">
					{marker.picturesKeys.map((key) => (
						<ImageCheckbox
							key={key}
							imageKey={key}
							isChecked={selectedImages.includes(key)}
							onCheck={() =>
								selectedImages.includes(key)
									? setSelectedImages(
											selectedImages.filter((imageKey) => imageKey !== key),
									  )
									: setSelectedImages([key, ...selectedImages])
							}
						/>
					))}
				</div>
				<DialogFooter>
					<Button
						variant="destructivePrimary"
						onClick={() =>
							deletePictures({
								id: marker.id,
								keys: selectedImages,
							})
						}
						isLoading={isLoading}
						disabled={!selectedImages.length}
					>
						Delete selection
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

const ImageCheckbox = ({
	imageKey,
	isChecked,
	onCheck,
}: { imageKey: string; isChecked: boolean; onCheck: () => void }) => (
	<div
		key={imageKey}
		className="relative group flex items-center justify-center aspect-square border border-input rounded-lg h-40 cursor-pointer"
		onClick={onCheck}
	>
		<ImageCheckboxOverlay isChecked={isChecked} />
		<Image src={getFileUrl(imageKey)} alt={"Some picture of the spot"} fill />
	</div>
);

const ImageCheckboxOverlay = ({ isChecked }: { isChecked: boolean }) => {
	if (!isChecked)
		return (
			<div className="absolute hidden group-hover:flex text-green-500 w-full h-full justify-center items-center bg-input/50 z-10 transition-all duration-1000">
				<CheckCircle2 className="h-8 w-8" />
			</div>
		);

	return (
		<div className="absolute text-green-700 flex w-full h-full justify-center items-center bg-input/50 z-10">
			<CheckCircle2 className="h-14 w-14" />
		</div>
	);
};
export default SpotImagesDelete;
