import { Button } from "@/components/ui/button";
import FieldFileUpload from "@/components/uploadthing/FieldFileUpload";
import { trpc } from "@/lib/trpc/client";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const ProfilePictureUpdate = () => {
	const [isDeleting, setIsDeleting] = useState(false);
	const router = useRouter();
	const trpcUtils = trpc.useUtils();
	const { mutate: pictureUpdate, isLoading } =
		trpc.account.updatePictureByKey.useMutation({
			onSuccess: () => {
				trpcUtils.account.invalidate();
				setIsDeleting(false);
				router.refresh();
			},
			onError: () => {
				toast.error("Error updating profile picture", {
					description: "The update of the profile picture failed",
				});
				setIsDeleting(false);
			},
		});

	return (
		<div className="flex flex-col items-end w-full gap-2">
			<FieldFileUpload
				error={
					<span className="flex items-center">
						Please make sure to provide
						<p className="font-bold mx-1 underline">one image</p> only.
					</span>
				}
				mode="single"
				onUpload={(key: string) => pictureUpdate({ key })}
				endpoint="profilePicture"
			/>
			<Button
				variant="destructivePrimary"
				onClick={() => {
					pictureUpdate({ key: "" });
					setIsDeleting(true);
				}}
				isLoading={isLoading && isDeleting}
			>
				<Trash /> Delete
			</Button>
		</div>
	);
};

export default ProfilePictureUpdate;
