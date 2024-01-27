import { UploadRouter } from "@/server/router";
import { generateReactHelpers } from "@uploadthing/react";

export const getFileUrl = (key: string | undefined) =>
	key ? `https://utfs.io/f/${key}` : "";

export const { useUploadThing } = generateReactHelpers<UploadRouter>();
