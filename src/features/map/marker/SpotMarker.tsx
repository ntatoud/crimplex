import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Marker as TMarker } from "@/server/config/schemas/Marker";
import { Pin } from "lucide-react";
import { Marker } from "react-map-gl";
import SpotPopupContent from "./SpotPopupContent";

const SpotMarker = ({
	marker,
	onOpen,
}: { marker: TMarker; onOpen: () => void }) => {
	const { position } = marker;

	return (
		<Marker
			latitude={position.latitude}
			longitude={position.longitude}
			onClick={(event) => {
				// event?.originalEvent.preventDefault();
				event.originalEvent.stopPropagation();
				onOpen();
			}}
		>
			<Popover>
				<PopoverTrigger>
					<Pin className="h-10 w-10 hover:cursor-pointer text-green-800 " />
				</PopoverTrigger>
				<PopoverContent sideOffset={10} className="z-0 w-[100vw] md:w-[400px]">
					<SpotPopupContent marker={marker} />
				</PopoverContent>
			</Popover>
		</Marker>
	);
};

export default SpotMarker;
