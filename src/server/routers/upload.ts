import { db } from "../config/db";
import {
	authenticatedProcedure,
	createUTRouter,
	files,
} from "../config/uploadthing";

export const imageUploader = createUTRouter({
	image: { maxFileSize: "8MB", maxFileCount: 5 },
})
	// Set permissions and file types for this FileRoute
	.middleware(authenticatedProcedure)
	.onUploadComplete(async ({ metadata, file }) => {
		console.log("Upload complete for userId:", metadata.user.id);
		console.log("File URL: ", file.url);

		// Add the file to the database
		try {
			const dbFile = await db.file.create({
				data: {
					key: file.key,
					url: file.url,
					name: file.name,
				},
			});
		} catch (e) {
			// Delete the image if it could not be added to the database
			files.deleteFiles(file.key);
			console.error("THIS IS THE ERROR", e);
			// Early return
			return {
				uploadedBy: metadata.user.name ?? metadata.user.email,
				isSuccess: false,
			};
		}

		return {
			uploadedBy: metadata.user.name ?? metadata.user.email,
			isSuccess: true,
		};
	});
