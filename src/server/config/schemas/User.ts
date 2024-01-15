import { z } from 'zod';

export const USER_AUTHORIZATION = ['user', 'admin'] as const;
export type UserAuthorization = z.infer<ReturnType<typeof zUserAuthorization>>;
export const zUserAuthorization = () => z.enum(USER_AUTHORIZATION);
export type User = z.infer<ReturnType<typeof zUser>>;
export const zUser = () =>
  z.object({
    id: z.string(),
    name: z.string(),
    email: z.string().email(),
    creationDate: z.date(),
    isActivated: z.boolean(),
    authorizations: z.array(zUserAuthorization()).catch(['user']),
  });

export const userPick = {
  id: true,
  name: true,
  email: true,
  creationDate: true,
  isActivated: true,
  authorizations: true,
};
