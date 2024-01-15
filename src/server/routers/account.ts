import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { zUserAccount } from '../config/schemas/Account';
import { createTRPCRouter, protectedProcedure } from '../config/trpc';

export const accountRouter = createTRPCRouter({
  get: protectedProcedure()
    .input(z.void())
    .output(zUserAccount())
    .query(async ({ ctx }) => {
      const user = await ctx.db.user.findUnique({
        where: { id: ctx.user.id },
        select: {
          id: true,
          name: true,
          email: true,
          authorizations: true,
        },
      });

      if (!user) {
        throw new TRPCError({
          code: 'NOT_FOUND',
        });
      }

      return user;
    }),
});
