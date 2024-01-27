/* eslint-disable no-process-env */
// @ts-check
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

const zNodeEnv = z
	.enum(["development", "test", "production"])
	.default("development");

export const env = createEnv({
	server: {
		DATABASE_URL: z.string().url(),
		AUTH_SECRET: z.string(),
		NODE_ENV: zNodeEnv,

		UPLOADTHING_SECRET: z.string(),
		EMAIL_SERVER: z.string().url(),
	},
	client: {
		NEXT_PUBLIC_BASE_URL: z.string().url(),
		NEXT_PUBLIC_MABPOX_TOKEN: z.string(),
	},

	runtimeEnv: {
		// SERVER ENV VAR
		DATABASE_URL: process.env.DATABASE_URL,
		NODE_ENV: process.env.NODE_ENV,
		AUTH_SECRET: process.env.AUTH_SECRET,
		EMAIL_SERVER: process.env.EMAIL_SERVER,
		UPLOADTHING_SECRET: process.env.UPLOADTHING_SECRET,

		// CLIENT ENV VAR
		NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_VERCEL_URL
			? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
			: process.env.NEXT_PUBLIC_BASE_URL,
		NEXT_PUBLIC_MABPOX_TOKEN: process.env.NEXT_PUBLIC_MABPOX_TOKEN,
	},
});
