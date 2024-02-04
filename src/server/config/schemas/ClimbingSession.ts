import { z } from "zod";

export type DateFilter = z.infer<ReturnType<typeof zDateFilter>>;
export const zDateFilter = () =>
	z.object({
		from: z.date().optional(),
		to: z.date().optional(),
	});

export type NameFilter = z.infer<ReturnType<typeof zNameFilter>>;
export const zNameFilter = () => z.object({ name: z.string() });

export type SessionFilter = z.infer<ReturnType<typeof zSessionFilter>>;
export const zSessionFilter = () =>
	z.object({
		nameFilter: zNameFilter().optional(),
		dateFilter: zDateFilter().optional(),
	});

export type ClimbingSession = z.infer<ReturnType<typeof zClimbingSession>>;
export const zClimbingSession = () =>
	z.object({
		id: z.string(),
		name: z.string(),
		date: z.date(),
		numClimbs: z.number(),
		duration: z.number(),
		userId: z.string(),
		spotId: z.string(),
	});
