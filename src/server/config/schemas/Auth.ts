import z from "zod";

export type AuthCredentials = z.infer<ReturnType<typeof zAuthCredentials>>;
export const zAuthCredentials = () =>
	z.object({
		name: z.string().min(1, { message: "Name can not be empty" }),
		email: z.string().email("Invalid email format"),
		password: z.string().min(1, { message: "Password can not be empty" }),
	});
export const authPick = { email: true, name: true } as const;
