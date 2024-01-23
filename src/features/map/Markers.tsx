import { Pin } from "lucide-react";
import { Marker } from "react-map-gl";

const Markers = () => {
	return (
		<>
			<Marker
				latitude={29.6448}
				longitude={78.216}
				onClick={() => alert("Marker")}
			>
				<Pin className="text-black h-10 w-100 hover:cursor-pointer" />
			</Marker>
		</>
	);
};

export default Markers;
