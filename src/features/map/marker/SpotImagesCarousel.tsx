import { FC } from "react";

import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import { getFileUrl } from "@/lib/uploadthing/client";
import { cn } from "@/lib/utils";
import { Marker } from "@/server/config/schemas/Marker";
import { ImageOff } from "lucide-react";
import Image from "next/image";

const style = {
	small: {
		container: "w-[75%]",
		item: "h-40 w-40 basis-2/3",
	},
	large: {
		container: "w-full",
		item: "basis-1/2",
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

	if (imagesSrc.length === 0) return <SpotImagesCarouselEmpty size={size} />;

	return (
		<Carousel className={style[size].container}>
			<CarouselContent className="mx-1">
				{imagesSrc.map((imageSrc) => (
					<CarouselItem
						key={imageSrc}
						className={cn(
							"relative flex items-center justify-center aspect-square object-cover border border-input rounded-lg overflow-hidden",
							style[size].item,
						)}
					>
						<Image src={imageSrc} alt={"Some picture of the spot"} fill />
					</CarouselItem>
				))}
			</CarouselContent>
			{imagesSrc.length > 1 && (
				<>
					<CarouselPrevious />
					<CarouselNext />
				</>
			)}
		</Carousel>
	);
};

const SpotImagesCarouselEmpty = ({ size }: { size: "small" | "large" }) => (
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
	</div>
);

export default SpotImagesCarousel;
