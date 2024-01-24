import FieldInput from "@/components/FieldInput";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc/client";
import { Marker, Position, zMarker } from "@/server/config/schemas/Marker";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const SpotCreateForm = ({
	onClose,
	...position
}: Position & {
	onClose: () => void;
}) => {
	const trpcUtils = trpc.useUtils();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Pick<Marker, "name">>({
		resolver: zodResolver(zMarker().pick({ name: true }).required()),
	});

	const { mutate: markerAdd, isLoading } = trpc.markers.create.useMutation({
		onSuccess: () => {
			trpcUtils.markers.invalidate();
			onClose();
		},
	});

	const onSubmit = (values: Pick<Marker, "name">) => {
		console.log(values);
		markerAdd({ ...values, position });
	};

	return (
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
				>
					Create
				</Button>
			</div>
		</form>
	);
};

export default SpotCreateForm;
