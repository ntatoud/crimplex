import { z } from "zod";

export type MarkerLike = z.infer<ReturnType<typeof zMarkerLike>>;
export const zMarkerLike = () =>
	z.object({
		id: z.string(),
		createdAt: z.date(),
		updatedAt: z.date(),
		markerId: z.string(),
		userId: z.string(),
	});
