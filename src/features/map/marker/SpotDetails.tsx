import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetContent,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { trpc } from "@/lib/trpc/client";
import { Marker } from "@/server/config/schemas/Marker";
import dayjs from "dayjs";
import { ArrowRight } from "lucide-react";
import { SpotImagesAdd } from "./SpotImagesAdd";
import SpotImagesCarousel from "./SpotImagesCarousel";
import SpotImagesDelete from "./SpotImagesDelete";

const SpotDetails = ({ marker }: { marker: Marker }) => {
	const author = trpc.users.getById.useQuery({
		id: marker.createdById,
	});
	const account = trpc.account.get.useQuery();

	const authorName =
		marker.createdById === account.data?.id ? "You" : author.data?.name;
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant="ghost" className="place-self-end w-fit">
					See more <ArrowRight className="w-4 h-4" />
				</Button>
			</SheetTrigger>

			<SheetContent side="left" className="w-[90vw] sm:max-w-[60vw]">
				<SheetHeader>
					<SheetTitle className="flex items-end gap-4 mb-3">
						<p className="text-3xl font-bold">{marker.name}</p>
						<span className="flex items-center font-semibold text-muted-foreground gap-0.5">
							Created by
							<Badge variant="outline" className="px-1.5 text-md">
								{authorName}
							</Badge>
						</span>
					</SheetTitle>
				</SheetHeader>
				<div className="flex flex-col flex-1">
					<div className="flex flex-1 mb-2 justify-between">
						<h3 className="text-2xl font-semibold">Images</h3>

						<div className="flex items-center gap-1">
							<SpotImagesDelete marker={marker} />
							<SpotImagesAdd marker={marker} />
						</div>
					</div>
					<div className="relative mx-10">
						<SpotImagesCarousel size="large" marker={marker} />
					</div>
				</div>
				{author.data?.name}
				{dayjs(marker.creationDate).format("DD MMMM YYYY")}
				{dayjs(marker.lastUpdate).fromNow()}

				<SheetFooter>Footer</SheetFooter>
			</SheetContent>
		</Sheet>
	);
};

export default SpotDetails;
