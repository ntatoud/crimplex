import FieldInput from "@/components/FieldInput";
import { Button, buttonVariants } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import FieldFileUpload from "@/components/uploadthing/FieldFileUpload";
import { trpc } from "@/lib/trpc/client";
import { MAX_SPOT_IMAGES } from "@/lib/uploadthing/constants";
import { Marker, Position, zMarker } from "@/server/config/schemas/Marker";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMap } from "react-map-gl";

const SpotCreateForm = ({
	onClose,
	...position
}: Position & {
	onClose: () => void;
}) => {
	const [marker, setMarker] = useState<Marker | null>(null);
	const trpcUtils = trpc.useUtils();
	const map = useMap();
	const finishSpotCreation = () => {
		trpcUtils.markers.invalidate();
		onClose();
		if (marker) {
			map.current?.flyTo({
				center: {
					lat: marker.position.latitude,
					lng: marker.position.longitude,
				},
				zoom: 8,
			});
		}
	};
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Pick<Marker, "name">>({
		resolver: zodResolver(zMarker().pick({ name: true }).required()),
	});

	const { mutate: addPictures } = trpc.markers.addPicturesKeys.useMutation({
		onSuccess: finishSpotCreation,
	});
	const { mutate: markerAdd, isLoading } = trpc.markers.create.useMutation({
		onSuccess: (data) => {
			setMarker(data);
		},
	});

	const onSubmit = (values: Pick<Marker, "name">) => {
		markerAdd({ ...values, position });
	};

	return (
		<>
			{!marker && (
				<div className="flex flex-col w-full">
					<h3 className="text-lg mb-5 font-semibold">Spot informations</h3>
					<form
						onSubmit={handleSubmit(onSubmit)}
						className="flex w-full justify-center"
					>
						<div className="grid max-w-sm gap-3">
							<FieldInput
								label="Name"
								error={errors?.name ? errors.name.message : ""}
								autoFocus
								{...register("name")}
							/>
							<Button
								variant="secondary"
								type="submit"
								disabled={!!errors.name || isLoading}
								isLoading={isLoading}
								className="text-lg"
							>
								Create
							</Button>
						</div>
					</form>
				</div>
			)}
			{!!marker && (
				<div className="flex flex-col w-full">
					<h3 className="text-lg font-semibold">Add pictures for your spot!</h3>
					<p className="text-muted-foreground text-sm mb-5">
						Pictures can help other users have a better idea of the spot !
					</p>
					<FieldFileUpload
						error={
							<span className="flex items-center">
								Please make sure to provide only
								<p className="font-bold mx-1 underline">images</p>
								and at most
								<p className="font-bold mx-1 underline">{MAX_SPOT_IMAGES}</p>.
							</span>
						}
						mode="multiple"
						endpoint="spotPictures"
						onUpload={(keys: string[]) => {
							console.log("add marker pictures");
							if (marker)
								addPictures({
									id: marker.id,
									keys,
								});
						}}
					/>
					<DialogClose
						className={buttonVariants({
							variant: "outline",
							className: "place-self-end mt-5",
						})}
						onClick={finishSpotCreation}
					>
						See later
					</DialogClose>
				</div>
			)}
		</>
	);
};

export default SpotCreateForm;
