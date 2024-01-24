import { authenticatedProcedure, createUTRouter } from "../config/uploadthing";

export const imageUploader = createUTRouter({ image: { maxFileSize: "4MB" } })
	// Set permissions and file types for this FileRoute
	.middleware(authenticatedProcedure)
	.onUploadComplete(async ({ metadata, file }) => {
		// This code RUNS ON YOUR SERVER after upload
		console.log("Upload complete for userId:", metadata.user.id);

		console.log("file url", file.url);

		// !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
		return { uploadedBy: metadata.user.name ?? metadata.user.email };
	});
