import { FC } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc/client";
import { UserAccount, zUserAccount } from "@/server/config/schemas/Account";

import FieldInput from "@/components/FieldInput";
import { CardAccountProps } from "../types";

type AccountUpdateField = Prettify<Pick<UserAccount, "name" | "email">>;

const CardAccountDetailsForm: FC<
	CardAccountProps & { changeView: () => void }
> = ({ account, changeView }) => {
	const router = useRouter();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<AccountUpdateField>({
		resolver: zodResolver(zUserAccount().pick({ name: true, email: true })),
	});
	const onSubmit = (values: AccountUpdateField) => {
		accountUpdate(values);
		setTimeout(() => {
			changeView();
		}, 200);
	};

	const trpcUtils = trpc.useUtils();
	const { mutate: accountUpdate, isLoading } = trpc.account.update.useMutation({
		onSuccess: (variables) => {
			toast.success("Updated with success", {
				description: `User ${
					variables.name ?? variables.email
				} has been updated.`,
			});
			router.refresh();
			trpcUtils.account.invalidate();
		},
		onError: () => {
			toast.error("Error updating user", {
				description: "The update of the user failed",
			});
		},
	});

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="grid gap-2">
				<div className="flex flex-col">
					<div className="font-semibold text-lg">
						<FieldInput
							defaultValue={account.name}
							error={errors.name ? errors.name.message : ""}
							{...register("name")}
						/>
					</div>
					<span className="text-sm text-muted-foreground ml-3">
						Joined in {dayjs(account?.creationDate).format("MMMM YYYY")}
					</span>
				</div>
				<div className="text-md text-gray-800 dark:text-gray-200">
					<div>
						<FieldInput
							defaultValue={account.email}
							error={errors.email ? errors.email.message : ""}
							{...register("email")}
						/>
					</div>
				</div>
				<Button
					type="submit"
					className="w-fit place-self-end"
					variant="secondary"
					disabled={isLoading}
					isLoading={isLoading}
				>
					Update
				</Button>
			</div>
		</form>
	);
};

export default CardAccountDetailsForm;
