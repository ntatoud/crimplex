export type ChartData<T extends { [value: string]: number }> = Prettify<
	T & { x: string }
>[];
