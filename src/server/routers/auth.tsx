import { randomUUID } from "crypto";

import { TRPCError } from "@trpc/server";

import { hash } from "bcrypt";
import dayjs from "dayjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { z } from "zod";

import { env } from "@/env.mjs";
import {
	VALIDATION_RETRY_DELAY_IN_SECONDS,
	VALIDATION_TOKEN_EXPIRATION_IN_MINUTES,
} from "@/features/auth/utils";
import EmailVerifyAccount from "@/features/emails/templates/verify-account";

import {
	AUTH_COOKIE,
	deleteUsedCode,
	generateCode,
	isValidPassword,
	validateCode,
} from "../config/auth";
import { sendEmail } from "../config/email";
import { ExtendedTRPCError } from "../config/errors";
import { zAuthCredentials } from "../config/schemas/Auth";
import { User, zUserAuthorization } from "../config/schemas/User";
import { createTRPCRouter, publicProcedure } from "../config/trpc";

export const authRouter = createTRPCRouter({
	isAuth: publicProcedure()
		.meta({
			openapi: {
				method: "GET",
				path: "/auth/is-auth",
				tags: ["auth"],
			},
		})
		.input(z.void())
		.output(
			z.object({
				status: z.boolean(),
				authorizations: z.array(zUserAuthorization()).optional(),
			}),
		)
		.query(async ({ ctx }) => {
			return {
				status: !!ctx.user,
				authorizations: ctx.user?.authorizations ?? ["user"],
			};
		}),
	register: publicProcedure()
		.meta({
			openapi: {
				method: "POST",
				path: "/auth/register",
				tags: ["auth"],
			},
		})
		.input(zAuthCredentials())
		.output(z.object({ token: z.string() }))
		.mutation(async ({ ctx, input }) => {
			const { name, email, password } = input;

			const existingUser = await ctx.db.user.findFirst({ where: { email } });
			const token = randomUUID();

			let newUser: User | undefined = undefined;
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
					throw new ExtendedTRPCError({
						cause: e,
					});
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
					"An error occured while creating or updating the user, the address may already exists, silent error for security reasons",
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
						.add(VALIDATION_TOKEN_EXPIRATION_IN_MINUTES, "minutes")
						.toDate(),
					code: code.hashed,
				},
			});

			// Send registration email
			await sendEmail({
				to: input.email,
				subject: "Verify your account",
				template: <EmailVerifyAccount code={code.readable} name={name} />,
			});

			return {
				token,
			};
		}),
	registerValidate: publicProcedure()
		.meta({
			openapi: {
				method: "POST",
				path: "/auth/register/{token}",
				tags: ["auth"],
				description: `Failed requests will increment retry delay timeout based on the number of attempts multiplied by ${VALIDATION_RETRY_DELAY_IN_SECONDS} seconds. The number of attempts will not be returned in the response for security purposes. You will have to save the number of attemps in the client.`,
			},
		})
		.input(z.object({ code: z.string().length(6), token: z.string().uuid() }))
		.output(z.object({ token: z.string() }))
		.mutation(async ({ ctx, input }) => {
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
					code: "UNAUTHORIZED",
					message: "Failed to authenticate the user",
				});
			}

			await deleteUsedCode({ ctx, token: verificationToken.token });

			return { token: userJwt };
		}),
	login: publicProcedure()
		.meta({
			openapi: {
				method: "POST",
				path: "/auth/login",
				tags: ["auth"],
			},
		})
		.input(zAuthCredentials().pick({ email: true, password: true }))
		.output(z.object({ authToken: z.string() }))
		.mutation(async ({ ctx, input }) => {
			const { email, password } = input;

			const user = await ctx.db.user.findUnique({
				where: { email },
			});

			if (!user || !(await isValidPassword(password, user.password)))
				throw new TRPCError({
					code: "BAD_REQUEST",
					message: "Invalid credentials",
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
		.meta({
			openapi: {
				method: "POST",
				path: "/auth/logout",
				tags: ["auth"],
			},
		})
		.input(z.void())
		.output(z.void())
		.mutation(async ({ ctx }) => {
			ctx.user = null;
			cookies().delete(AUTH_COOKIE);
		}),
});
