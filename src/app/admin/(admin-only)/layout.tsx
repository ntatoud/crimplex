import AdminNavbar from "@/components/AdminNavbar/AdminNavbar";
import { GuardAdmin } from "@/features/auth/guard/GuardAdmin";

export default function AdminAuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<GuardAdmin>
			<AdminNavbar />
			<main className="flex flex-1">{children}</main>
		</GuardAdmin>
	);
}
