// biome-ignore lint/suspicious/noExplicitAny: This is an utilitary type
declare type TODO = any;

// biome-ignore lint/suspicious/noExplicitAny: This is an utilitary type
declare type ExplicitAny = any;

declare type Prettify<T> = {
	[K in keyof T]: T[K];
} & NonNullable<unknown>;
