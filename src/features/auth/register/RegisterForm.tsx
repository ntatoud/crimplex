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
			<div className="grid gap-5">
				<div className="grid gap-2">
					<Label htmlFor="name">Name</Label>
					<Input
						id="name"
						type="text"
						disabled={isLoading}
						className={errors?.name ? "ring-2 ring-red-500" : ""}
						{...register("name")}
					/>
					{errors?.name && (
						<p className="text-sm text-red-500">{errors.name.message}</p>
					)}
				</div>
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
						showStrength
						{...register("password")}
					/>
					{errors?.password && (
						<p className="text-sm text-red-500">{errors.password.message}</p>
					)}
				</div>

				<Button className="mt-2" size="lg" type="submit" disabled={isLoading}>
					{isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
					Create account
				</Button>
			</div>
		</form>
	);
};

export default RegisterForm;
