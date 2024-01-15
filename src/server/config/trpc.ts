import { Prisma } from '@prisma/client';
import { TRPCError, inferAsyncReturnType, initTRPC } from '@trpc/server';
import { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';
import superjson from 'superjson';
import { ZodError } from 'zod';

import { getServerSideUser } from './auth';
import { db } from './db';
import { UserAuthorization } from './schemas/User';

/* CREATION OF THE CONTEXT */
export const createTRPCContext = async ({
  req,
}: FetchCreateContextFnOptions) => {
  const user = await getServerSideUser();
  return { req, user, db };
};
export type AppContext = inferAsyncReturnType<typeof createTRPCContext>;

/* CREATION OF THE ROUTER */

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
        prismaError:
          error.cause instanceof Prisma.PrismaClientKnownRequestError
            ? error.cause.meta
            : null,
      },
    };
  },
});

export const createTRPCRouter = t.router;

/* CREATION OF THE PROCEDURES */

export const publicProcedure = () => t.procedure;

export const protectedProcedure = (
  options: {
    authorizations?: UserAuthorization[];
  } = {}
) =>
  publicProcedure().use(
    t.middleware(({ ctx, next }) => {
      const user = ctx.user;

      if (!user || user.isActivated !== true) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: user?.email,
        });
      }

      // Check if the user has at least one of the authorizations
      if (
        options.authorizations &&
        !options.authorizations.some((a) => user.authorizations.includes(a))
      ) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: String(user.authorizations),
        });
      }

      return next({
        ctx: {
          // infers the `user` as non-nullable
          user,
        },
      });
    })
  );
