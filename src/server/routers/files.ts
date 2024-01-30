import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../config/trpc";

export const filesRouter = createTRPCRouter({
	deleteByKey: protectedProcedure()
		.meta({
			openapi: {
				method: "DELETE",
				path: "/files",
				protect: true,
				tags: ["files"],
			},
		})
		.input(z.object({ key: z.string() }))
		.output(z.object({ key: z.string() }))
		.mutation(async ({ ctx, input }) => {
			if (!(await ctx.files.deleteFiles(input.key))) {
				throw new TRPCError({
					code: "INTERNAL_SERVER_ERROR",
					message: "Could not delete the file",
				});
			}

			return { key: input.key };
		}),
});
