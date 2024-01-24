import { Button } from "@/components/ui/button";
import { Drawer } from "@/components/ui/drawer";
import { trpc } from "@/lib/trpc/client";
import { Position } from "@/server/config/schemas/Marker";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { FilterControl } from "../controls/FilterControl";
import useOnMapClick from "../hooks/useOnMapClick";
import SpotMarker from "./SpotMarker";
import SpotMarkerCreate from "./SpotMarkerCreate";

const Markers = () => {
	const [open, setOpen] = useState(false);
	const [currentMarker, setCurrentMarker] = useState<Position | null>(null);

	const markers = trpc.markers.getAll.useQuery();

	useOnMapClick((event: mapboxgl.MapMouseEvent & mapboxgl.EventData) => {
		setCurrentMarker({
			latitude: event.lngLat.lat,
			longitude: event.lngLat.lng,
		});
		setOpen(true);
	});
	return (
		<div key={String(markers.data?.length)}>
			{markers.isError && (
				<FilterControl position="top-left">
					<Button onClick={() => markers.refetch()}>Try again</Button>
				</FilterControl>
			)}
			{markers.isLoading && (
				<div className="absolute flex w-full h-full items-center justify-center bg-black/30">
					<Loader2 className="animate-spin h-10 w-10 text-gray-100" />
				</div>
			)}
			{markers.data?.map((marker) => (
				<SpotMarker
					key={`${marker.position.latitude}-${marker.position.longitude}`}
					marker={marker}
				/>
			))}
			{currentMarker && (
				<Drawer
					open={open}
					onOpenChange={(open) => setOpen(open)}
					onClose={() => setCurrentMarker(null)}
				>
					<SpotMarkerCreate
						onClose={() => setCurrentMarker(null)}
						{...currentMarker}
					/>
				</Drawer>
			)}
		</div>
	);
};

export default Markers;
