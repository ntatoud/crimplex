import { TRPCError } from '@trpc/server';
import { hash } from 'bcrypt';
import { randomUUID } from 'crypto';
import dayjs from 'dayjs';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { z } from 'zod';

import { env } from '@/env.mjs';
import { VALIDATION_TOKEN_EXPIRATION_IN_MINUTES } from '@/features/auth/utils';

import {
  AUTH_COOKIE,
  deleteUsedCode,
  generateCode,
  isValidPassword,
  validateCode,
} from '../config/auth';
import { sendEmail } from '../config/email';
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
    .output(z.object({ token: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { name, email, password } = input;

      const existingUser = await ctx.db.user.findFirst({ where: { email } });
      const token = randomUUID();

      let newUser;
      const hashedPassword = await hash(password, 12);
      if (!existingUser) {
        try {
          newUser = await ctx.db.user.create({
            data: {
              name,
              email,
              password: hashedPassword,
            },
          });
        } catch (e) {
          // Can be improved
          console.error(e);
        }
      } else if (existingUser && !existingUser.isActivated) {
        newUser = await ctx.db.user.update({
          where: {
            email,
          },
          data: {
            name,
            password: hashedPassword,
          },
        });
      }

      if (!newUser) {
        console.error(
          'An error occured while creating or updating the user, the address may already exists, silent error for security reasons'
        );
        return { token };
      }

      // Generate the code
      const code = await generateCode();
      // Create validation token
      await ctx.db.verificationToken.create({
        data: {
          userId: newUser.id,
          token,
          expires: dayjs()
            .add(VALIDATION_TOKEN_EXPIRATION_IN_MINUTES, 'minutes')
            .toDate(),
          code: code.hashed,
        },
      });

      // Send registration email
      await sendEmail({
        to: input.email,
        subject: 'Register validate',
        template: (
          <div className="text-bold">Here is your code : {code.readable}</div>
        ),
      });

      return {
        token,
      };
    }),
  registerValidate: publicProcedure()
    .input(z.object({ code: z.string().length(6), token: z.string().uuid() }))
    .output(z.object({ token: z.string() }))
    .mutation(async ({ ctx, input }) => {
      console.log('yes');
      const { verificationToken, userJwt } = await validateCode({
        ctx,
        ...input,
      });

      //Update the user
      try {
        await ctx.db.user.update({
          where: {
            id: verificationToken.userId,
            isActivated: false,
          },
          data: {
            isActivated: true,
          },
        });
      } catch (e) {
        // Failed to update, user probably already verified
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Failed to authenticate the user',
        });
      }

      await deleteUsedCode({ ctx, token: verificationToken.token });

      return { token: userJwt };
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
