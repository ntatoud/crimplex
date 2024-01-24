import { FC } from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";

// TODO : Add marker images to the carousel
interface MarkerImagesCarouselProps {
	imagesSrc: string[];
}

const MarkerImagesCarousel: FC<MarkerImagesCarouselProps> = () => {
	return (
		<Carousel
			className="w-[350px]"
			opts={{
				align: "start",
				loop: true,
			}}
		>
			<CarouselContent>
				<CarouselItem className="basis-2/3">
					<Card>
						<CardContent className="flex h-40  items-center justify-center p-6">
							1
						</CardContent>
					</Card>
				</CarouselItem>
				<CarouselItem className="basis-2/3">
					<Card>
						<CardContent className="flex h-40 items-center justify-center p-6">
							2
						</CardContent>
					</Card>
				</CarouselItem>
				<CarouselItem className="basis-2/3">
					<Card>
						<CardContent className="flex h-40  items-center justify-center p-6">
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
