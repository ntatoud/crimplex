import { TRPCError } from '@trpc/server';
import { hash } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { z } from 'zod';

import { env } from '@/env.mjs';

import { AUTH_COOKIE, isValidPassword } from '../config/auth';
import { zAuthCredentials } from '../config/schemas/Auth';
import { zUserAuthorization } from '../config/schemas/User';
import { createTRPCRouter, publicProcedure } from '../config/trpc';

export const authRouter = createTRPCRouter({
  isAuth: publicProcedure()
    .input(z.void())
    .output(
      z.object({
        status: z.boolean(),
        authorizations: z.array(zUserAuthorization()).optional(),
      })
    )
    .query(async ({ ctx }) => {
      return {
        status: !!ctx.user,
        authorizations: ctx.user?.authorizations ?? ['user'],
      };
    }),
  register: publicProcedure()
    .input(zAuthCredentials())
    .output(
      z.object({
        status: z.number(),
        message: z.string(),
        result: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { name, email, password } = input;

      const isEmailTaken = await ctx.db.user.findFirst({ where: { email } });

      if (isEmailTaken) {
        throw new TRPCError({
          code: 'CONFLICT',
          message: 'Email already taken',
        });
      }

      const hashedPassword = await hash(password, 12);

      const result = await ctx.db.user.create({
        data: {
          name: name,
          email,
          password: hashedPassword,
        },
      });

      return {
        status: 201,
        message: 'Account created successfully',
        result: result.email,
      };
    }),

  login: publicProcedure()
    .input(zAuthCredentials().pick({ email: true, password: true }))
    .output(z.object({ authToken: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { email, password } = input;

      const user = await ctx.db.user.findUnique({
        where: { email },
      });

      if (!user || !(await isValidPassword(password, user.password)))
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Invalid credentials',
        });

      const authToken = jwt.sign({ id: user.id }, env.AUTH_SECRET);
      cookies().set({
        name: AUTH_COOKIE,
        value: authToken,
        httpOnly: true,
      });

      return { authToken };
    }),

  logout: publicProcedure()
    .input(z.void())
    .output(z.void())
    .mutation(async ({ ctx }) => {
      ctx.user = null;
      cookies().delete(AUTH_COOKIE);
    }),
});
