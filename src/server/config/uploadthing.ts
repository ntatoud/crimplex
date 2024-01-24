import { createUploadthing } from "uploadthing/next";
import { UTApi } from "uploadthing/server";
import { getServerSideUser } from "./auth";

export const files = new UTApi();

export const createUTRouter = createUploadthing();

export const authenticatedProcedure = async () => {
	const user = await getServerSideUser();

	if (!user || user.isActivated !== true) {
		throw new Error("UNAUTHORIZED");
	}

	return { user: user };
};
