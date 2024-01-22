import Logo from "@/components/Icons/Logo";
import {
	Carousel,
	CarouselApi,
	CarouselContent,
	CarouselItem,
} from "@/components/ui/carousel";

import Autoplay from "embla-carousel-autoplay";
import { useEffect, useState } from "react";
import { carouselContent } from "./config";

const Illustration = () => {
	const [api, setApi] = useState<CarouselApi>();
	const [current, setCurrent] = useState(0);

	useEffect(() => {
		if (!api) {
			return;
		}

		setCurrent(api.selectedScrollSnap() + 1);

		api.on("select", () => {
			setCurrent(api.selectedScrollSnap() + 1);
		});
	}, [api]);
	return (
		<div className="flex flex-1 relative md:flex-col bg-secondary brightness-90  dark:brightness-110 md:justify-end overflow-hidden">
			<div className="flex flex-1 items-center justify-center">
				<Logo width="240" height="80" />
			</div>
			<div className="flex flex-col items-center justify-end mb-5">
				<Carousel
					plugins={[
						Autoplay({
							delay: 5000,
						}),
					]}
					opts={{
						loop: true,
					}}
					setApi={setApi}
				>
					<CarouselContent>
						{Array.from({ length: carouselContent.length }).map((_, index) => (
							<CarouselItem key={String(index)}>
								<div className="p-1">
									<div className="flex items-center justify-center p-6 w-full">
										<span className="flex gap-1 text-xl italic text-gray-800 font-semibold dark:text-gray-300">
											"{carouselContent[index].description}" -
											<p className="text-gray-600 not-italic dark:text-gray-400 font-medium">
												{carouselContent[index].author}
											</p>
										</span>
									</div>
								</div>
							</CarouselItem>
						))}
					</CarouselContent>
					<div className="flex w-full justify-center">
						{current} / {carouselContent.length}
					</div>
				</Carousel>
			</div>
		</div>
	);
};

export default Illustration;
