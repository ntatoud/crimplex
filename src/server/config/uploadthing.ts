import { createUploadthing } from "uploadthing/next";
import { getServerSideUser } from "./auth";

export const createUTRouter = createUploadthing();

export const authenticatedProcedure = async () => {
	const user = await getServerSideUser();

	if (!user || user.isActivated !== true) {
		throw new Error("UNAUTHORIZED");
	}

	return { user: user };
};
