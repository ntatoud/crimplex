import { VerificationToken } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { compare } from 'bcrypt';
import bcrypt from 'bcrypt';
import { randomInt } from 'crypto';
import dayjs from 'dayjs';
import jwt from 'jsonwebtoken';
import { cookies, headers } from 'next/headers';

import { env } from '@/env.mjs';
import {
  VALIDATION_CODE_MOCKED,
  getValidationRetryDelayInSeconds,
} from '@/features/auth/utils';

import { db } from './db';
import { userPick, zUser } from './schemas/User';
import { AppContext } from './trpc';

export const AUTH_COOKIE = 'auth-token';

export const getServerSideUser = async () => {
  const authToken =
    headers().get('Authorization')?.split('Bearer ')[1] ??
    cookies().get(AUTH_COOKIE)?.value;

  if (!authToken) return null;

  const jwtUser = jwtDecode(authToken);

  if (!jwtUser?.id) {
    return null;
  }
  const user = await db.user.findUnique({
    where: {
      id: jwtUser.id,
    },
    select: userPick,
  });

  if (!user) {
    return;
  }

  return zUser().parse(user);
};

export const jwtDecode = (authToken: string) => {
  try {
    const jwtUser = jwt.verify(authToken, env.AUTH_SECRET);
    if (!jwtUser || typeof jwtUser !== 'object' || !('id' in jwtUser)) {
      return null;
    }

    return jwtUser;
  } catch {
    return null;
  }
};

export const generateCode = async () => {
  const code =
    env.NODE_ENV === 'development'
      ? VALIDATION_CODE_MOCKED
      : randomInt(0, 999999).toString().padStart(6, '0');

  return { hashed: await bcrypt.hash(code, 12), readable: code };
};

export const validateCode = async ({
  ctx,
  code,
  token,
}: {
  ctx: AppContext;
  code: string;
  token: string;
}): Promise<{ verificationToken: VerificationToken; userJwt: string }> => {
  // Delete the already expired tokens
  await ctx.db.verificationToken.deleteMany({
    where: { expires: { lt: new Date() } },
  });

  const verificationToken = await ctx.db.verificationToken.findUnique({
    where: {
      token,
    },
  });
  if (!verificationToken) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'Failed to authenticate the user',
    });
  }

  const retryDelayInSeconds = getValidationRetryDelayInSeconds(
    verificationToken.attempts
  );

  // Check if the last attempt was spaced enough from expiration
  if (
    dayjs().isBefore(
      dayjs(verificationToken.lastAttemptAt).add(retryDelayInSeconds, 'seconds')
    )
  ) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'Failed to authenticate the user',
    });
  }

  const isCodeValid = await bcrypt.compare(code, verificationToken.code);
  if (!isCodeValid) {
    try {
      await ctx.db.verificationToken.update({
        where: {
          token,
        },
        data: {
          attempts: {
            increment: 1,
          },
        },
      });
    } catch (e) {
      console.error('Failed to update token attempts');
    }

    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'Failed to authenticate the user',
    });
  }

  const userJwt = jwt.sign({ id: verificationToken.userId }, env.AUTH_SECRET);
  if (!userJwt) {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
    });
  }

  return { verificationToken, userJwt };
};

export async function deleteUsedCode({
  ctx,
  token,
}: {
  ctx: AppContext;
  token: string;
}) {
  try {
    await ctx.db.verificationToken.delete({
      where: { token },
    });
  } catch (e) {
    console.error('Failed to delete the used token');
  }
}

export const isValidPassword = async (
  password: string,
  userPassword: string
) => {
  return await compare(password, userPassword);
};
