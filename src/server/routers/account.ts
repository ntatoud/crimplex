import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { ExtendedTRPCError } from "../config/errors";
import { accountPick, zUserAccount } from "../config/schemas/Account";
import { createTRPCRouter, protectedProcedure } from "../config/trpc";

export const accountRouter = createTRPCRouter({
	get: protectedProcedure()
		.meta({
			openapi: {
				method: "GET",
				path: "/accounts/me",
				protect: true,
				tags: ["accounts"],
			},
		})
		.input(z.void())
		.output(zUserAccount())
		.query(async ({ ctx }) => {
			const user = await ctx.db.user.findUnique({
				where: { id: ctx.user.id },
				select: accountPick,
			});

			if (!user) {
				throw new TRPCError({
					code: "NOT_FOUND",
				});
			}

			return user;
		}),
	update: protectedProcedure()
		.meta({
			openapi: {
				method: "PUT",
				path: "/accounts/me",
				protect: true,
				tags: ["accounts"],
			},
		})
		.input(zUserAccount().pick({ email: true, name: true }).required())
		.output(zUserAccount())
		.mutation(async ({ ctx, input }) => {
			try {
				return await ctx.db.user.update({
					where: { id: ctx.user.id },
					data: input,
				});
			} catch (e) {
				throw new ExtendedTRPCError({
					cause: e,
				});
			}
		}),
	updatePictureByKey: protectedProcedure()
		.meta({
			openapi: {
				method: "PUT",
				path: "/accounts/me/{key}",
				protect: true,
				tags: ["accounts"],
			},
		})
		.input(z.object({ key: z.string() }))
		.output(z.object({ key: z.string() }))
		.mutation(async ({ ctx, input }) => {
			// Get the key of the old profile picture
			const result = await ctx.db.user.findFirst({
				where: {
					id: ctx.user.id,
				},
				select: {
					profilePictureKey: true,
				},
			});

			// If an existing picture was found
			if (result?.profilePictureKey) {
				// Delete it (and if it fails throw an error)
				if (!(await ctx.files.deleteFiles(result.profilePictureKey))) {
					throw new TRPCError({
						code: "INTERNAL_SERVER_ERROR",
						message: "Could not update the profile picture",
					});
				}
			}

			// Update the user with the new key
			await ctx.db.user.update({
				where: {
					id: ctx.user.id,
				},
				data: {
					profilePictureKey: input.key,
				},
			});

			return { key: input.key };
		}),
});
