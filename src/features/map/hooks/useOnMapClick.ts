import { useEffect } from "react";
import { useMap } from "react-map-gl";

const useOnMapClick = (
	handler: (event: mapboxgl.MapMouseEvent & mapboxgl.EventData) => void,
) => {
	const { current: map } = useMap();
	useEffect(() => {
		map?.on("click", handler);

		return () => {
			map?.off("click", handler);
		};
	}, [map, handler]);
};

export default useOnMapClick;
