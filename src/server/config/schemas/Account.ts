import { z } from "zod";

import { zUser } from "./User";

export type UserAccount = z.infer<ReturnType<typeof zUserAccount>>;
export const zUserAccount = () => zUser().pick(accountPick);
export const accountPick = {
	id: true,
	name: true,
	email: true,
	profilePictureKey: true,
	authorizations: true,
	creationDate: true,
} as const;
