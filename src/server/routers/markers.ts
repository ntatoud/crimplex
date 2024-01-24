import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { zMarkerLike } from "../config/schemas/Like";
import { markerCreatePick, zMarker } from "../config/schemas/Marker";
import {
	createTRPCRouter,
	protectedProcedure,
	publicProcedure,
} from "../config/trpc";

export const markersRouter = createTRPCRouter({
	getAll: publicProcedure()
		.input(z.void())
		.output(z.array(zMarker()))
		.query(async ({ ctx }) => {
			return await ctx.db.marker.findMany();
		}),

	isLiked: publicProcedure()
		.input(
			zMarker()
				.pick({ position: true } as const)
				.required(),
		)
		.output(z.boolean())
		.query(async ({ ctx, input }) => {
			if (!ctx.user) {
				return false;
			}

			return !!(await ctx.db.markerLike.findFirst({
				where: {
					marker: {
						position: input.position,
					},
				},
			}));
		}),
	create: protectedProcedure()
		.input(zMarker().pick(markerCreatePick).required())
		.output(zMarker())
		.mutation(async ({ ctx, input }) => {
			const existingMarker = await ctx.db.marker.findFirst({
				where: {
					position: input.position,
				},
			});

			if (existingMarker) {
				throw new TRPCError({
					code: "CONFLICT",
					message: "A marker already exists at this position",
				});
			}

			const marker = await ctx.db.marker.create({
				data: {
					createdById: ctx.user.id,
					position: input.position,
					name: input.name,
				},
			});

			if (!marker) {
				throw new TRPCError({
					code: "INTERNAL_SERVER_ERROR",
					message: "Marker could not be created",
				});
			}

			return zMarker().parse(marker);
		}),
	like: protectedProcedure()
		.input(
			zMarker()
				.pick({ position: true } as const)
				.required(),
		)
		.output(zMarkerLike())
		.mutation(async ({ ctx, input }) => {
			// Get the marker to like
			const marker = await ctx.db.marker.findFirst({
				select: {
					id: true,
				},
				where: {
					position: input.position,
				},
			});

			if (!marker) {
				throw new TRPCError({
					code: "FORBIDDEN",
					message: "This marker has been deleted",
				});
			}

			// Create the like for the marker
			const like = await ctx.db.markerLike.findFirst({
				where: {
					marker: {
						position: input.position,
					},
				},
			});

			if (like) {
				return await ctx.db.markerLike.delete({
					where: {
						id: like.id,
					},
				});
			}

			return await ctx.db.markerLike.create({
				data: {
					markerId: marker?.id,
					userId: ctx.user.id,
				},
			});
		}),

	deleteByPos: protectedProcedure()
		.input(
			zMarker()
				.pick({ position: true } as const)
				.required(),
		)
		.output(zMarker())
		.mutation(async ({ ctx, input }) => {
			const marker = await ctx.db.marker.findFirst({
				where: {
					position: input.position,
				},
			});

			if (!marker) {
				throw new TRPCError({ code: "NOT_FOUND", message: "Marker not found" });
			}

			return await ctx.db.marker.delete({
				where: {
					id: marker.id,
				},
			});
		}),
});
