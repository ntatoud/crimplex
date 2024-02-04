import { Prisma } from "@prisma/client";
import { z } from "zod";
import {
	zClimbingSession,
	zSessionFilter,
} from "../config/schemas/ClimbingSession";
import { createTRPCRouter, protectedProcedure } from "../config/trpc";

export const trainingRouter = createTRPCRouter({
	getAllForUser: protectedProcedure()
		.input(zSessionFilter())
		.output(z.array(zClimbingSession()))
		.query(async ({ ctx, input }) => {
			const { nameFilter, dateFilter } = input;

			const spots = await ctx.db.marker.findMany({
				where: {
					name: {
						contains: nameFilter?.name,
					},
				},
			});
			const where = {
				userId: ctx.user.id,
				OR: [
					{
						name: {
							contains: nameFilter?.name,
						},
					},
					{
						spotId: {
							in: spots.map((spot) => spot.id),
						},
					},
				],
				date: {
					gte: dateFilter?.from,
					lte: dateFilter?.to,
				},
			} satisfies Prisma.ClimbingSessionWhereInput;

			return await ctx.db.climbingSession.findMany({
				where,
				orderBy: {
					date: "asc",
				},
			});
		}),
});
