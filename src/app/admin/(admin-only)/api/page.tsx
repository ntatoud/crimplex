"use client";

import { LoaderFull } from "@/components/LoaderFull";
import dynamic from "next/dynamic";

const PageAdminAPI = dynamic(
	() => import("@/features/admin/api/PageAdminAPI"),
	{
		loading: () => <LoaderFull />,
	},
);
const Page = () => {
	return <PageAdminAPI />;
};

export default Page;
