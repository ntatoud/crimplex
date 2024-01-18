import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { ExtendedTRPCError } from '../config/errors';
import { accountPick, zUserAccount } from '../config/schemas/Account';
import { createTRPCRouter, protectedProcedure } from '../config/trpc';

export const accountRouter = createTRPCRouter({
  get: protectedProcedure()
    .input(z.void())
    .output(zUserAccount())
    .query(async ({ ctx }) => {
      const user = await ctx.db.user.findUnique({
        where: { id: ctx.user.id },
        select: accountPick,
      });

      if (!user) {
        throw new TRPCError({
          code: 'NOT_FOUND',
        });
      }

      return user;
    }),

  update: protectedProcedure()
    .input(zUserAccount().required().pick({ email: true, name: true }))
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
});
