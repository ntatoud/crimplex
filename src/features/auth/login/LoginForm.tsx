import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import PasswordInput from "@/components/PasswordInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
			<div className="grid gap-5">
				<div className="grid gap-2">
					<Label htmlFor="email">Email</Label>
					<Input
						id="email"
						placeholder="name@example.com"
						type="email"
						disabled={isLoading}
						className={errors?.email ? "ring-2 ring-red-500" : ""}
						{...register("email")}
					/>
					{errors?.email && (
						<p className="text-sm text-red-500">{errors.email.message}</p>
					)}
				</div>
				<div className="grid gap-2">
					<Label htmlFor="password">Password</Label>
					<PasswordInput
						id="password"
						disabled={isLoading}
						{...register("password")}
					/>
					{errors?.password && (
						<p className="text-sm text-red-500">{errors.password.message}</p>
					)}
				</div>

				<Button
					className="mt-2"
					type="submit"
					size="lg"
					variant="secondary"
					disabled={isLoading}
				>
					{isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
					Sign in with email
				</Button>
			</div>
		</form>
	);
};

export default LoginForm;
