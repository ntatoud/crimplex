import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import FieldInput from "@/components/FieldInput";
import FieldPasswordInput from "@/components/FieldPasswordInput";
import LogoAdmin from "@/components/Icons/LogoAdmin";
import { Button, buttonVariants } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { trpc } from "@/lib/trpc/client";
import { cn } from "@/lib/utils";
import {
	AuthCredentials,
	zAuthCredentials,
} from "@/server/config/schemas/Auth";

const PageAdminLogin = () => {
	const router = useRouter();
	const trpcUtils = trpc.useUtils();
	const { mutate: userLogin, isLoading } = trpc.auth.login.useMutation({
		onSuccess: () => {
			router.push("/admin");
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
		<>
			<div className="flex items-end">
				<LogoAdmin width="300" height="100" />
			</div>
			<Card className="sm:w-80 sm:max-w-sm md:w-full">
				<CardHeader>
					<CardTitle>Admin Login</CardTitle>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="grid w-full items-center gap-4">
							<FieldInput
								label="Email"
								disabled={isLoading}
								{...register("email")}
								error={errors.email ? errors.email.message : ""}
							/>
							<FieldPasswordInput
								disabled={isLoading}
								{...register("password")}
								error={errors.password ? errors.password.message : ""}
							/>
							<Button
								className="w-full gap-1"
								type="submit"
								disabled={isLoading}
								isLoading={isLoading}
							>
								Sign in as <p className="font-bold"> Admin</p>
							</Button>
						</div>
					</form>
				</CardContent>
				<CardFooter className="flex flex-col gap-5">
					<div className="relative flex h-fit justify-center items-center w-full">
						<Separator className="w-full bg-muted-foreground" />
						<div className="absolute px-2 font-semibold text-xs bg-background text-muted-foreground">
							OR
						</div>
					</div>
					<Link
						className={cn(
							buttonVariants({
								variant: "secondary",
								className: "w-full gap-1",
							}),
						)}
						href="/login"
					>
						Sign In on the <b>App</b>
					</Link>
				</CardFooter>
			</Card>
		</>
	);
};

export default PageAdminLogin;
