import { z } from "zod";

export const USER_AUTHORIZATION = ["user", "admin"] as const;
export type UserAuthorization = z.infer<ReturnType<typeof zUserAuthorization>>;
export const zUserAuthorization = () => z.enum(USER_AUTHORIZATION);

export type User = z.infer<ReturnType<typeof zUser>>;
export const zUser = () =>
	z.object({
		id: z.string(),
		name: z.string().min(1, { message: "Name can not be empty" }),
		email: z.string().email("Invalid email format"),
		profilePictureKey: z.string().nullable(),
		creationDate: z.date(),
		isActivated: z.boolean(),
		authorizations: z.array(zUserAuthorization()).catch(["user"]),
	});

export const userPick = {
	id: true,
	name: true,
	email: true,
	profilePictureKey: true,
	creationDate: true,
	isActivated: true,
	authorizations: true,
};
