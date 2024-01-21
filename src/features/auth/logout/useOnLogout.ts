import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { trpc } from "@/lib/trpc/client";

const useOnLogout = ({
	redirectPath = "/login",
}: {
	redirectPath?: string;
}) => {
	const trpcUtils = trpc.useUtils();
	const router = useRouter();
	const onLogoutSuccess = () => {
		trpcUtils.auth.isAuth.setData(undefined, {
			status: false,
		});
		router.push(redirectPath);
		toast.success("Success", {
			description: "Logged out",
		});
	};

	return trpc.auth.logout.useMutation({
		onSuccess: onLogoutSuccess,
	});
};

export default useOnLogout;
