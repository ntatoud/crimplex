import { FC } from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

// TODO : Add marker images to the carousel
interface MarkerImagesCarouselProps {
	imagesSrc: string[];
	size?: "small" | "large";
}

const MarkerImagesCarousel: FC<MarkerImagesCarouselProps> = ({
	imagesSrc,
	size = "small",
}) => {
	const style = {
		small: {
			container: "w-[75%]",
			item: "h-40",
		},
		large: {
			container: "w-full h-[40vh]",
			item: "h-[35vh]",
		},
	} as const;
	return (
		<Carousel
			className={style[size].container}
			opts={{
				align: "center",
				loop: true,
			}}
		>
			<CarouselContent>
				<CarouselItem className="basis-2/3">
					<Card>
						<CardContent
							className={cn(
								"flex items-center justify-center p-6",
								style[size].item,
							)}
						>
							1
						</CardContent>
					</Card>
				</CarouselItem>
				<CarouselItem className="basis-2/3">
					<Card>
						<CardContent
							className={cn(
								"flex items-center justify-center p-6",
								style[size].item,
							)}
						>
							2
						</CardContent>
					</Card>
				</CarouselItem>
				<CarouselItem className="basis-2/3">
					<Card>
						<CardContent
							className={cn(
								"flex items-center justify-center p-6",
								style[size].item,
							)}
						>
							3
						</CardContent>
					</Card>
				</CarouselItem>
			</CarouselContent>
			<CarouselPrevious />
			<CarouselNext />
		</Carousel>
	);
};

export default MarkerImagesCarousel;
