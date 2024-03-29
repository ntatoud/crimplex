"use client";

import { ReactNode, useEffect } from "react";

import { useRouter } from "next/navigation";

import { ErrorPage } from "@/components/ErrorPage";
import { LoaderFull } from "@/components/LoaderFull";
import { trpc } from "@/lib/trpc/client";

export const GuardAuth = ({ children }: { children: ReactNode }) => {
	const isAuth = trpc.auth.isAuth.useQuery();
	const router = useRouter();

	useEffect(() => {
		if (isAuth.isSuccess && !isAuth.data.status) router.replace("/login");
	}, [router, isAuth.isSuccess, isAuth.data]);

	if (isAuth.isSuccess && isAuth.data?.status) {
		return <>{children}</>;
	}

	if (isAuth.isError) {
		return <ErrorPage />;
	}

	return <LoaderFull />;
};
