import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import { ArrowUpDown, Check, Clock } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc/client";
import { User } from "@/server/config/schemas/User";

import AdminUserActions from "./AdminUserActions";

export const useUserColumns: () => ColumnDef<User>[] = () => {
	const { data: account } = trpc.account.get.useQuery();

	return [
		{
			id: "name",
			accessorFn: (row) => `${row.email} ${row.name}`,
			header: ({ column }) => (
				<Button
					variant="ghost"
					className="px-1"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Name / Email
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			),
			cell: ({ row }) => {
				const [email, name] = (row.getValue("name") as string).split(" ");
				return (
					<div className="flex flex-col text-left font-medium max-w-[10rem] md:max-w-none">
						<div className="flex truncate">
							{email === account?.email && (
								<Badge
									variant="outline"
									className="bg-green-200 text-green-600 dark:bg-green-200 dark:text-green-600 dark:opacity-80"
								>
									You
								</Badge>
							)}
							<div className="flex flex-grow truncate">{name}</div>
						</div>
						<div className="lowercase truncate">{email}</div>
					</div>
				);
			},
		},
		{
			accessorKey: "authorizations",
			header: "",
			cell: ({ row }) => {
				const isAdmin = (row.getValue("authorizations") as string[]).includes(
					"admin",
				);
				return isAdmin ? (
					<div className="hidden w-0 md:w-fit md:flex justify-center">
						<Badge variant="secondary" className="w-fit">
							Admin
						</Badge>
					</div>
				) : (
					""
				);
			},
		},
		{
			accessorKey: "id",
			header: "ID",
			cell: ({ row }) => <div className="capitalize">{row.getValue("id")}</div>,
		},
		{
			accessorKey: "creationDate",
			header: ({ column }) => {
				return (
					<div className="flex flex-grow justify-left">
						<Button
							variant="ghost"
							className="px-1"
							onClick={() =>
								column.toggleSorting(column.getIsSorted() === "asc")
							}
						>
							Creation date
							<ArrowUpDown className="ml-2 h-4 w-4" />
						</Button>
					</div>
				);
			},
			cell: ({ row }) => {
				const formattedDate = dayjs(row.getValue("creationDate")).fromNow();
				return <div className="lowercase text-center">{formattedDate}</div>;
			},
		},
		{
			accessorKey: "isActivated",
			header: "Active",
			cell: ({ row }) => {
				const statusIcon = row.getValue("isActivated") ? (
					<Badge
						variant="outline"
						className="gap-1 bg-green-200 text-green-600 dark:bg-green-200 dark:text-green-600 dark:opacity-80 p-1"
					>
						<Check className="w-4 h-4 px-0" />{" "}
						<div className="hidden md:block">Activated</div>
					</Badge>
				) : (
					<Badge
						variant="outline"
						className="gap-1 bg-yellow-200 text-yellow-700 dark:opacity-80 p-1"
					>
						<Clock className="w-4 h-4 px-0" />{" "}
						<div className="hidden md:block">Pending</div>
					</Badge>
				);

				return (
					<div className="flex justify-center md:justify-start">
						{statusIcon}
					</div>
				);
			},
		},
		{
			id: "actions",
			enableHiding: false,
			cell: ({ row }) => <AdminUserActions user={row.original} />,
		},
	];
};
