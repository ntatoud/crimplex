import { GuardGuestOnly } from "@/features/auth/guard/GuardGuestOnly";

export default function AdminGuestOnlyLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<GuardGuestOnly>
			<main className="flex flex-1 items-center justify-center">
				{children}
			</main>
		</GuardGuestOnly>
	);
}
