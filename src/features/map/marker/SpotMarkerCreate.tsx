import {
	DrawerContent,
	DrawerHeader,
	DrawerPortal,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import { Position } from "@/server/config/schemas/Marker";
import { PlusCircle } from "lucide-react";
import { Marker } from "react-map-gl";
import SpotCreateForm from "./SpotCreateForm";

const SpotMarkerCreate = ({
	onClose,
	...props
}: Position & {
	onClose: () => void;
}) => {
	return (
		<>
			<DrawerTrigger>
				<Marker {...props}>
					<PlusCircle className="h-10 w-10 transition-all text-black" />
				</Marker>
			</DrawerTrigger>
			<DrawerPortal>
				<DrawerContent>
					<DrawerHeader>
						<DrawerTitle>Add a new spot</DrawerTitle>
					</DrawerHeader>

					<div className="h-60">
						<SpotCreateForm {...props} onClose={onClose} />
					</div>
				</DrawerContent>
			</DrawerPortal>
		</>
	);
};

export default SpotMarkerCreate;
