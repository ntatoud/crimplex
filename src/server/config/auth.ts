import { compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { cookies, headers } from 'next/headers';

import { env } from '@/env.mjs';

import { db } from './db';
import { userPick, zUser } from './schemas/User';

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

export const isValidPassword = async (
  password: string,
  userPassword: string
) => {
  return await compare(password, userPassword);
};
