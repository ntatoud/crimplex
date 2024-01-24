// TRPC
import { createTRPCRouter } from "./config/trpc";
import { accountRouter } from "./routers/account";
import { authRouter } from "./routers/auth";
import { filesRouter } from "./routers/files";
import { markersRouter } from "./routers/markers";
import { usersRouter } from "./routers/users";

// UPLOAD THING
import { FileRouter as CoreFileRouter } from "uploadthing/next";
import { imageUploader } from "./routers/upload";

export const appRouter = createTRPCRouter({
	auth: authRouter,
	users: usersRouter,
	account: accountRouter,
	markers: markersRouter,
	files: filesRouter,
});
export type AppRouter = typeof appRouter;

export const uploadRouter = {
	imageUploader,
} satisfies CoreFileRouter;
export type UploadRouter = typeof uploadRouter;
