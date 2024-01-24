import { UploadRouter } from "@/server/router";
import { generateComponents } from "@uploadthing/react";

export const { UploadButton, UploadDropzone } =
	generateComponents<UploadRouter>();
