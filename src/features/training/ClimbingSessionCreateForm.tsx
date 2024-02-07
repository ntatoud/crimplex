import { FieldDatePicker } from "@/components/FieldDatePicker";
import FieldInput from "@/components/FieldInput";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc/client";
import {
	ClimbingSessionCreate,
	zClimbingSessionCreate,
} from "@/server/config/schemas/ClimbingSession";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const ClimbingSessionCreateForm = () => {
	const createClimbingSession = trpc.training.createClimbingSession.useMutation(
		{
			onSuccess: () => {
				toast.success("Climbing session created with success.");
			},
		},
	);

	const {
		control,
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<ClimbingSessionCreate>({
		resolver: zodResolver(zClimbingSessionCreate()),
	});

	const onSubmit = (values: ClimbingSessionCreate) => {
		console.log(values);
		createClimbingSession.mutate(values);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="flex flex-col justify-center items-center gap-6 max-w-md">
				<FieldInput
					label="Name"
					autoFocus
					error={errors.name?.message}
					required
					{...register("name")}
				/>
				<FieldInput
					type="number"
					step="0.25"
					label="Duration (in hours)"
					error={errors.duration?.message}
					required
					{...register("duration", { valueAsNumber: true })}
				/>
				<FieldInput
					type="number"
					label="Number of blocks done"
					error={errors.numClimbs?.message}
					required
					{...register("numClimbs", { valueAsNumber: true })}
				/>
				<FieldDatePicker
					control={control}
					label="Date"
					error={errors.date?.message}
					maxDate={new Date()}
					{...register("date")}
					required
				/>
				<FieldInput
					label="Spot"
					error={errors.spotName?.message}
					{...register("spotName")}
				/>
				<Button
					type="submit"
					className="place-self-end"
					isLoading={createClimbingSession.isLoading}
				>
					Create
				</Button>
			</div>
		</form>
	);
};

export default ClimbingSessionCreateForm;
