import { MAX_SPOT_IMAGES } from "@/lib/uploadthing/constants";
import { authenticatedProcedure, createUTRouter } from "../config/uploadthing";

export const profilePicture = createUTRouter({
	image: { maxFileSize: "8MB", maxFileCount: 1 },
})
	// Set permissions and file types for this FileRoute
	.middleware(authenticatedProcedure)
	.onUploadComplete(async ({ metadata, file }) => {
		console.log("Uploaded on profilePicture");
		console.log("Upload complete for userId:", metadata.user.id);
		console.log("File URL: ", file.url);
		// Add the file to the database

		return {
			uploadedBy: metadata.user.name ?? metadata.user.email,
		};
	});

export const spotPictures = createUTRouter({
	image: { maxFileSize: "8MB", maxFileCount: MAX_SPOT_IMAGES },
})
	.middleware(authenticatedProcedure)
	.onUploadComplete(async ({ metadata, file }) => {
		console.log("Uploaded on spotPictures");

		console.log("Upload complete for userId:", metadata.user.id);
		console.log("File URL: ", file.url);
		// Add the file to the database

		return {
			uploadedBy: metadata.user.name ?? metadata.user.email,
		};
	});
