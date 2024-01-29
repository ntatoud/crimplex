import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { zUser } from "../config/schemas/User";
import {
	createTRPCRouter,
	protectedProcedure,
	publicProcedure,
} from "../config/trpc";

export const usersRouter = createTRPCRouter({
	getAll: protectedProcedure({ authorizations: ["admin"] })
		.input(z.void())
		.output(z.array(zUser()))
		.query(async ({ ctx }) => {
			return await ctx.db.user.findMany({
				orderBy: {
					id: "desc",
				},
			});
		}),
	deactivate: protectedProcedure({ authorizations: ["admin"] })
		.input(
			zUser().required().pick({
				id: true,
			}),
		)
		.output(zUser())
		.mutation(async ({ ctx, input }) => {
			if (ctx.user.id === input.id) {
				throw new TRPCError({
					code: "FORBIDDEN",
					message: "You cannot activate yourself",
				});
			}

			return await ctx.db.user.update({
				where: { id: input.id },
				data: {
					isActivated: false,
				},
			});
		}),
	activate: protectedProcedure({ authorizations: ["admin"] })
		.input(
			zUser().required().pick({
				id: true,
			}),
		)
		.output(zUser())
		.mutation(async ({ ctx, input }) => {
			if (ctx.user.id === input.id) {
				throw new TRPCError({
					code: "FORBIDDEN",
					message: "You cannot activate yourself",
				});
			}

			return await ctx.db.user.update({
				where: { id: input.id },
				data: {
					isActivated: true,
				},
			});
		}),
	deleteById: protectedProcedure({ authorizations: ["admin"] })
		.input(
			zUser().required().pick({
				id: true,
			}),
		)
		.output(zUser())
		.mutation(async ({ ctx, input }) => {
			if (ctx.user.id === input.id) {
				throw new TRPCError({
					code: "FORBIDDEN",
					message: "You cannot remove yourself",
				});
			}

			return await ctx.db.user.delete({
				where: { id: input.id },
			});
		}),
	getById: publicProcedure()
		.input(z.object({ id: z.string() }))
		.output(zUser())
		.query(async ({ ctx, input }) => {
			const user = await ctx.db.user.findFirst({
				where: {
					id: input.id,
				},
			});
			if (!user) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "Could not find user with given id",
				});
			}

			return user;
		}),
});
