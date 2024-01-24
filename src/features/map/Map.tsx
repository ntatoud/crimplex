import { env } from "@/env.mjs";

import "mapbox-gl/dist/mapbox-gl.css";

import ReactMapBoxGl from "react-map-gl";
import ControlsLayer from "./ControlsLayer";
import { DEFAULT_VIEW_STATE } from "./constants";
import useOnContextMenu from "./hooks/useOnContextMenu";
import Markers from "./marker/Markers";

/**
 * A layer placed over the map to give access to the context menu
 */
const ContextMenuLayer = () => (
	<div
		id="context-menu-layer"
		className="absolute hidden w-full h-full pointer-events-none z-10 md:flex"
	/>
);

const Map = () => {
	const initialViewState = DEFAULT_VIEW_STATE;
	return (
		<div className="relative flex flex-1" onMouseDown={useOnContextMenu()}>
			<ContextMenuLayer />
			<ReactMapBoxGl
				id="map-container"
				mapboxAccessToken={env.NEXT_PUBLIC_MABPOX_TOKEN}
				initialViewState={initialViewState}
				mapStyle="mapbox://styles/mapbox/streets-v9"
				style={{ width: "100%", height: "100%", zIndex: 0 }}
				dragRotate={false}
			>
				<ControlsLayer />
				<Markers />
			</ReactMapBoxGl>
		</div>
	);
};

export default Map;
