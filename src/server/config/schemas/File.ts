import { z } from "zod";

export type File = z.infer<ReturnType<typeof zFile>>;
export const zFile = () =>
	z.object({
		id: z.string(),
		name: z.string(),
		key: z.string(),
		url: z.string().url(),
	});
