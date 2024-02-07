import { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import {
	zClimbingSession,
	zClimbingSessionCreate,
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
	createClimbingSession: protectedProcedure()
		.input(zClimbingSessionCreate())
		.output(zClimbingSession())
		.mutation(async ({ ctx, input }) => {
			const { spotName, ...sessionData } = input;

			const spot = await ctx.db.marker.findFirst({
				where: {
					name: spotName,
				},
			});

			const newSession = await ctx.db.climbingSession.create({
				data: {
					userId: ctx.user.id,
					spotId: spot?.id,
					...sessionData,
				},
			});

			if (!newSession) {
				throw new TRPCError({
					code: "INTERNAL_SERVER_ERROR",
					message: "Could not create the climbing session",
				});
			}

			return newSession;
		}),
});
