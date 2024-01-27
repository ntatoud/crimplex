import { authenticatedProcedure, createUTRouter } from "../config/uploadthing";

export const profilePicture = createUTRouter({
	image: { maxFileSize: "8MB", maxFileCount: 1 },
})
	// Set permissions and file types for this FileRoute
	.middleware(authenticatedProcedure)
	.onUploadComplete(async ({ metadata, file }) => {
		console.log("Upload complete for userId:", metadata.user.id);
		console.log("File URL: ", file.url);
		// Add the file to the database

		return {
			uploadedBy: metadata.user.name ?? metadata.user.email,
		};
	});
