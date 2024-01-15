import { createTRPCRouter } from './config/trpc';
import { accountRouter } from './routers/account';
import { authRouter } from './routers/auth';
import { usersRouter } from './routers/users';

export const appRouter = createTRPCRouter({
  auth: authRouter,
  users: usersRouter,
  account: accountRouter,
});

export type AppRouter = typeof appRouter;
