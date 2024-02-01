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
import { ImageOff, ImagePlus } from "lucide-react";
import Image from "next/image";

const style = {
	small: {
		container: "w-[75%]",
		item: "h-40 basis-2/3",
	},
	large: {
		container: "w-full h-[40vh]",
		item: "h-[35vh] basis-1/3",
	},
} as const;

interface MarkerImagesCarouselProps {
	marker: Marker;
	size?: "small" | "large";
}

const MarkerImagesCarousel: FC<MarkerImagesCarouselProps> = ({
	marker,
	size = "small",
}) => {
	const imagesSrc = marker.picturesKeys.map((key) => getFileUrl(key));
	const account = trpc.account.get.useQuery();
	const canAddImages = account.data?.id === marker.createdById;

	if (imagesSrc.length === 0)
		return <MarkerImagesCarouselEmpty size={size} isVisible={canAddImages} />;

	return (
		<Carousel
			className={style[size].container}
			opts={{
				align: "center",
				loop: true,
			}}
		>
			<CarouselContent>
				{imagesSrc.map((imageSrc) => (
					<CarouselItem
						key={imageSrc}
						className={cn(
							"relative flex items-center justify-center aspect-square",
							style[size].item,
						)}
					>
						<Image src={imageSrc} alt={"Some picture of the spot"} fill />
					</CarouselItem>
				))}
				{imagesSrc.length < MAX_SPOT_IMAGES && canAddImages && (
					<CarouselItem className={style[size].item}>
						<MarkerImagesCarouselAdd size={size} isVisible={canAddImages} />
					</CarouselItem>
				)}
			</CarouselContent>
			<CarouselPrevious />
			<CarouselNext />
		</Carousel>
	);
};

const MarkerImagesCarouselEmpty = ({
	size,
	isVisible,
}: { size: "small" | "large"; isVisible: boolean }) => (
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
		<MarkerImagesCarouselAdd size={size} isVisible={isVisible} />
	</div>
);

const MarkerImagesCarouselAdd = ({
	size,
	isVisible,
}: { size: "small" | "large"; isVisible: boolean }) => {
	if (!isVisible) return;

	return (
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
	);
};

export default MarkerImagesCarousel;
