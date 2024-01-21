import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { TRPCClientErrorLike } from "@trpc/client";
import { Info, Loader2 } from "lucide-react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { parseAsInteger, useQueryState } from "nuqs";
import { UseFormSetError, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import PinInput from "@/components/CodeInput";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { getValidationRetryDelayInSeconds } from "@/features/auth/utils";
import { trpc } from "@/lib/trpc/client";
import { AppRouter } from "@/server/router";

export const RegisterValidateForm = () => {
	const params = useParams();
	const searchParams = useSearchParams();

	const token = params?.token?.toString() ?? "";
	const email = searchParams.get("email") ?? "your email";

	const onCodeValidateSuccess = useOnCodeValidateSuccess();

	const {
		handleSubmit,
		setError,
		setValue,
		clearErrors,
		formState: { errors },
	} = useForm<{ code: string }>({
		resolver: zodResolver(
			z.object({
				code: z.string().length(6, { message: "Code should be 6 digits" }),
			}),
		),
	});
	const onCodeValidateError = useOnCodeValidateError({ setError });
	const { mutate: userRegisterValidate, isLoading } =
		trpc.auth.registerValidate.useMutation({
			onSuccess: onCodeValidateSuccess,
			onError: onCodeValidateError,
		});

	const onSubmit = ({ code }: { code: string }) => {
		userRegisterValidate({ code, token });
	};

	const handleOnComplete = (value: string) => {
		setValue("code", value);

		// Waiting for the setValue to be done.
		setTimeout(() => {
			onSubmit({ code: value });
		}, 200);
	};
	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="grid gap-5 text-lg">
					<span className="mb-2">
						<h2 className="font-bold text-2xl pb-2">
							The code is in your mailbox
						</h2>
						<p className="text-sm">
							We sent the validation code to <b>{email}</b>.
						</p>
						<p className="text-sm pt-1">
							{" "}
							This code will expire after <b>5 minutes</b>.
						</p>
					</span>
					<div className="grid gap-3">
						<Label
							className="flex text-zinc-800 dark:text-zinc-200"
							htmlFor="code"
						>
							Verification code <p className="text-red-500 pl-1">*</p>
						</Label>
						<PinInput
							setValue={setValue}
							onComplete={handleOnComplete}
							errors={errors}
							clearErrors={clearErrors}
							isLoading={isLoading}
						/>
						<span className="flex gap-1 text-sm text-muted-foreground">
							Can not find the code?
							<p className="font-medium">Check your spams</p>
						</span>
						{errors?.code && (
							<p className=" flex items-center text-sm text-red-500">
								<Info className="h-4" />
								{errors.code.message}
							</p>
						)}
					</div>
					<Button
						className="h-12 text-lg mt-2"
						type="submit"
						disabled={isLoading}
					>
						{isLoading ? <Loader2 className="animate-spin" /> : "Confirm"}
					</Button>
				</div>
			</form>
		</div>
	);
};
export const useOnCodeValidateSuccess = () => {
	const router = useRouter();

	const queryCache = useQueryClient();
	const searchParams = useSearchParams();
	return async () => {
		queryCache.clear();

		router.push(searchParams.get("redirect") || "/login");
		toast.success("Success", {
			description: "Your account has been activated",
		});
	};
};

export const useOnCodeValidateError = ({
	setError,
}: {
	setError: UseFormSetError<{
		code: string;
	}>;
}) => {
	const [attempts, setAttemps] = useQueryState(
		"attemps",
		parseAsInteger.withDefault(0),
	);

	return async (error: TRPCClientErrorLike<AppRouter>) => {
		if (error.data?.code === "UNAUTHORIZED") {
			const seconds = getValidationRetryDelayInSeconds(attempts);

			setAttemps((s) => s + 1);

			await new Promise((r) => {
				setTimeout(r, seconds * 1_000);
			});
		}

		setError("code", { message: "Unknown code" });
	};
};
