import { z } from "zod";

export type Position = z.infer<ReturnType<typeof zPosition>>;
export const zPosition = () =>
	z.object({
		latitude: z.number(),
		longitude: z.number(),
	});

export type Marker = z.infer<ReturnType<typeof zMarker>>;
export const zMarker = () =>
	z.object({
		id: z.string(),
		name: z.string().min(1, { message: "Name can not be empty" }),
		position: zPosition(),
		createdById: z.string(),
		creationDate: z.date(),
		lastUpdate: z.date(),
	});

export const markerCreatePick = {
	name: true,
	position: true,
} as const;
