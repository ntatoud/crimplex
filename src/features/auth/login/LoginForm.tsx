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

const LoginForm = () => {
	const router = useRouter();
	const trpcUtils = trpc.useUtils();
	const { mutate: userLogin, isLoading } = trpc.auth.login.useMutation({
		onSuccess: () => {
			router.push("/");
			trpcUtils.auth.isAuth.setData(undefined, { status: true });
			trpcUtils.auth.isAuth.invalidate();
			toast.success("Success", {
				description: "Connection successful",
				className: "bg-green-600",
			});
		},
		onError: () => {
			toast.error("Error", {
				description: "Error",
				className: "bg-red-600",
			});
		},
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Omit<AuthCredentials, "name">>({
		resolver: zodResolver(
			zAuthCredentials().pick({ email: true, password: true }),
		),
	});

	const onSubmit = ({ email, password }: Omit<AuthCredentials, "name">) => {
		userLogin({ email, password });
	};
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="grid gap-8">
				<FieldInput
					label="Email"
					autoFocus
					type="email"
					disabled={isLoading}
					{...register("email")}
				/>
				<FieldPasswordInput
					id="password"
					disabled={isLoading}
					{...register("password")}
					error={errors.password ? errors.password.message : ""}
				/>

				<Button
					className="mt-2"
					type="submit"
					size="lg"
					variant="secondary"
					disabled={isLoading}
					isLoading={isLoading}
				>
					Sign in with email
				</Button>
			</div>
		</form>
	);
};

export default LoginForm;
