import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { trpc } from "@/lib/trpc/client";
import { Marker, Position, zMarker } from "@/server/config/schemas/Marker";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

const SpotCreateForm = ({
	onClose,
	...position
}: Position & {
	onClose: () => void;
}) => {
	const trpcUtils = trpc.useUtils();
	const router = useRouter();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Pick<Marker, "name">>({
		resolver: zodResolver(zMarker().pick({ name: true }).required()),
	});

	const { mutate: markerAdd, isLoading } = trpc.markers.create.useMutation({
		onSuccess: () => {
			console.log("success");
			trpcUtils.markers.invalidate();
			onClose();
		},
		onError: (error) => {
			console.log(error);
		},
	});

	const onSubmit = (values: Pick<Marker, "name">) => {
		markerAdd({ ...values, position });
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="flex w-full justify-center"
		>
			<div className="grid max-w-sm gap-3">
				<div className="grid gap-1">
					<Label htmlFor="name">Name</Label>
					<Input id="name" {...register("name")} />
					{errors?.name && (
						<p className="text-red-500">{errors.name.message}</p>
					)}
				</div>
				<Button
					variant="secondary"
					type="submit"
					disabled={!!errors.name || isLoading}
				>
					{isLoading ? <Loader2 className="animate-spin h-6 w-6" /> : "Create"}
				</Button>
			</div>
		</form>
	);
};

export default SpotCreateForm;
