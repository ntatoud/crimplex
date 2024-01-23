import { Button } from "@/components/ui/button";
import { FilterControl } from "./controls/FilterControl";

const ControlsLayer = () => {
	return (
		<>
			<FilterControl filters={["test"]} className="bg-red-500 p-5">
				<Button onClick={() => alert("clicked")}>Test</Button>
			</FilterControl>
		</>
	);
};

export default ControlsLayer;
