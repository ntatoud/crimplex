import {
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Position } from "@/server/config/schemas/Marker";
import { PlusCircle } from "lucide-react";
import { Marker } from "react-map-gl";
import SpotCreateForm from "./SpotCreateForm";

// TODO : Prevent flow for unlogged users
const SpotMarkerCreate = ({
	onClose,
	...props
}: Position & {
	onClose: () => void;
}) => {
	return (
		<>
			<DialogTrigger>
				<Marker {...props}>
					<PlusCircle className="h-10 w-10 transition-all text-black" />
				</Marker>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle className="text-2xl">Create a new spot</DialogTitle>
				</DialogHeader>
				<div className="min-h-[20vh] my-5">
					<SpotCreateForm {...props} onClose={onClose} />
				</div>
			</DialogContent>
		</>
	);
};

export default SpotMarkerCreate;
