/* eslint-disable @typescript-eslint/no-explicit-any */

declare type TODO = any;

declare type ExplicitAny = any;

declare type Prettify<T> = {
  [K in keyof T]: T[K];
} & NonNullable<unknown>;
