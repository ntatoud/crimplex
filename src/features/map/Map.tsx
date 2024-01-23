import { env } from "@/env.mjs";
import { useState } from "react";

import "mapbox-gl/dist/mapbox-gl.css";

import ReactMapBoxGl from "react-map-gl";
import ControlsLayer from "./ControlsLayer";
import Markers from "./Markers";

const Map = () => {
	const [viewport, setViewport] = useState({
		latitude: 28.6448,
		longitude: 77.216,
		zoom: 6,
	});

	return (
		<div
			className="relative flex flex-1 "
			onMouseDown={(event) => {
				const test = document.getElementById("context-menu-layer");
				if (test) {
					test.classList.remove("pointer-events-none");
					test.classList.add("pointer-events-auto");

					setTimeout(() => {
						test.classList.remove("pointer-events-auto");
						test.classList.add("pointer-events-none");
					}, 20);
				}
			}}
		>
			<div
				id="context-menu-layer"
				className="w-full h-full absolute pointer-events-none  z-10"
			/>
			<ReactMapBoxGl
				id="map-container"
				mapboxAccessToken={env.NEXT_PUBLIC_MABPOX_TOKEN}
				initialViewState={viewport}
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
