import { Button } from "@/components/ui/button";
import { Drawer } from "@/components/ui/drawer";
import { trpc } from "@/lib/trpc/client";
import { Position } from "@/server/config/schemas/Marker";
import { Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { FilterControl } from "../controls/FilterControl";
import useOnMapClick from "../hooks/useOnMapClick";
import SpotMarker from "./SpotMarker";
import SpotMarkerCreate from "./SpotMarkerCreate";

const Markers = () => {
	const [drawerOpen, setDrawerOpen] = useState(false);
	const [popupOpen, setPopupOpen] = useState(false);
	const [currentMarker, setCurrentMarker] = useState<Position | null>(null);

	const markers = trpc.markers.getAll.useQuery();

	const searchParams = useSearchParams();
	useOnMapClick((event: mapboxgl.MapMouseEvent & mapboxgl.EventData) => {
		if (popupOpen) {
			setPopupOpen(false);
			return;
		}

		setCurrentMarker({
			latitude: event.lngLat.lat,
			longitude: event.lngLat.lng,
		});
		setDrawerOpen(true);
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
					onOpen={() => setPopupOpen(true)}
				/>
			))}
			{currentMarker && (
				<Drawer
					open={drawerOpen}
					onOpenChange={(open) => setDrawerOpen(open)}
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
