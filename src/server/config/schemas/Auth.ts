import z from 'zod';

export type AuthCredentials = z.infer<ReturnType<typeof zAuthCredentials>>;
export const zAuthCredentials = () =>
  z.object({
    name: z.string(),
    email: z.string().email('Invalid email format'),
    password: z.string(),
  });
export const authPick = { email: true, name: true } as const;
