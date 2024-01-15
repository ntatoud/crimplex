/* eslint-disable no-process-env */
// @ts-check
import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

const zNodeEnv = z
  .enum(['development', 'test', 'production'])
  .default('development');

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    AUTH_SECRET: z.string(),
    NODE_ENV: zNodeEnv,
  },
  client: {
    NEXT_PUBLIC_BASE_URL: z.string().url(),
  },

  runtimeEnv: {
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_VERCEL_URL
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
      : process.env.NEXT_PUBLIC_BASE_URL,
    DATABASE_URL: process.env.DATABASE_URL,
    AUTH_SECRET: process.env.AUTH_SECRET,
    NODE_ENV: process.env.NODE_ENV,
  },
});
