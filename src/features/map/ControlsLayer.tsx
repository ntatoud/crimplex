import { Button } from "@/components/ui/button";
import { FilterControl } from "./controls/FilterControl";

// TODO : Create controls
const ControlsLayer = () => {
	return (
		<>
			<FilterControl filters={["test"]} className=" p-5">
				<Button onClick={() => alert("clicked")} disabled={true}>
					🚧 Filters
				</Button>
			</FilterControl>
		</>
	);
};

export default ControlsLayer;
