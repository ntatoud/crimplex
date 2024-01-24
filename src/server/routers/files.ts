import { TRPCError } from "@trpc/server";
import { zFile } from "../config/schemas/File";
import { createTRPCRouter, protectedProcedure } from "../config/trpc";

export const filesRouter = createTRPCRouter({
	deleteByKey: protectedProcedure()
		.input(zFile().pick({ key: true }))
		.output(zFile())
		.mutation(async ({ ctx, input }) => {
			const file = await ctx.db.file.findFirst({
				where: {
					key: input.key,
				},
			});

			if (!file) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "File not found",
				});
			}

			if (!(await ctx.files.deleteFiles(input.key))) {
				throw new TRPCError({
					code: "INTERNAL_SERVER_ERROR",
					message: "Could not delete the file",
				});
			}

			return file;
		}),
});
