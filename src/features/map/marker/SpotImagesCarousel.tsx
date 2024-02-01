import { FC } from "react";

import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import { trpc } from "@/lib/trpc/client";
import { getFileUrl } from "@/lib/uploadthing/client";
import { MAX_SPOT_IMAGES } from "@/lib/uploadthing/constants";
import { cn } from "@/lib/utils";
import { Marker } from "@/server/config/schemas/Marker";
import { ImageOff } from "lucide-react";
import Image from "next/image";
import { SpotImagesAdd } from "./SpotImagesAdd";

const style = {
	small: {
		container: "w-[75%]",
		item: "h-40 basis-2/3",
	},
	large: {
		container: "w-full",
		item: "basis-1/3",
	},
} as const;

interface SpotImagesCarouselProps {
	marker: Marker;
	size?: "small" | "large";
}

const SpotImagesCarousel: FC<SpotImagesCarouselProps> = ({
	marker,
	size = "small",
}) => {
	const imagesSrc = marker.picturesKeys.map((key) => getFileUrl(key));
	const account = trpc.account.get.useQuery();
	const canAddImages = account.data?.id === marker.createdById;

	if (imagesSrc.length === 0)
		return <SpotImagesCarouselEmpty size={size} marker={marker} />;

	return (
		<Carousel
			className={style[size].container}
			opts={{
				align: "center",
				loop: true,
			}}
		>
			<CarouselContent className="gap-1 p-1">
				{imagesSrc.map((imageSrc) => (
					<CarouselItem
						key={imageSrc}
						className={cn(
							"relative flex items-center justify-center aspect-square border border-input rounded-lg",
							style[size].item,
						)}
					>
						<Image src={imageSrc} alt={"Some picture of the spot"} fill />
					</CarouselItem>
				))}
				{imagesSrc.length < MAX_SPOT_IMAGES && canAddImages && (
					<CarouselItem className={style[size].item}>
						<SpotImagesAdd size={size} marker={marker} />
					</CarouselItem>
				)}
			</CarouselContent>
			<CarouselPrevious />
			<CarouselNext />
		</Carousel>
	);
};

const SpotImagesCarouselEmpty = ({
	size,
	marker,
}: { size: "small" | "large"; marker: Marker }) => (
	<div className="flex justify-center gap-3">
		<div
			className={cn(
				"relative flex flex-col items-center justify-center aspect-square border border-input rounded-lg",
				size === "small" ? "w-40" : "w-60",
			)}
		>
			<ImageOff className="text-muted-foreground" />
			<p>No images</p>
		</div>
		<SpotImagesAdd size={size} marker={marker} />
	</div>
);

export default SpotImagesCarousel;
