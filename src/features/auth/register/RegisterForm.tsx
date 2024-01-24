import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import FieldInput from "@/components/FieldInput";
import FieldPasswordInput from "@/components/FieldPasswordInput";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc/client";
import {
	AuthCredentials,
	zAuthCredentials,
} from "@/server/config/schemas/Auth";

const RegisterForm = () => {
	const router = useRouter();
	const { mutate: userRegister, isLoading } = trpc.auth.register.useMutation({
		onSuccess: (data, variables) => {
			router.push(`/register/${data.token}?email=${variables.email}`);
		},
		onError: () => {
			toast.error("Error", {
				description: "Something went wrong...",
				className: "bg-red-600",
			});
		},
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<AuthCredentials>({
		resolver: zodResolver(zAuthCredentials().required()),
	});

	const onSubmit = ({ name, email, password }: AuthCredentials) => {
		userRegister({ name, email, password });
	};
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="grid gap-8">
				<FieldInput
					label="Name"
					type="text"
					disabled={isLoading}
					error={errors?.name ? errors.name.message : ""}
					{...register("name")}
				/>
				<FieldInput
					label="Email"
					type="email"
					disabled={isLoading}
					error={errors?.email ? errors.email.message : ""}
					{...register("email")}
				/>
				<FieldPasswordInput
					id="password"
					disabled={isLoading}
					error={errors?.password ? errors.password.message : ""}
					showStrength
					{...register("password")}
				/>
				<Button
					className="mt-2"
					size="lg"
					type="submit"
					disabled={isLoading}
					isLoading={isLoading}
				>
					Create account
				</Button>
			</div>
		</form>
	);
};

export default RegisterForm;
