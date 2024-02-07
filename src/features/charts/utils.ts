import { ChartData } from "./schema";

export const cumSum = <T extends { [x: string]: number }>(
	chartData: ChartData<T>,
	key: string,
) => chartData.reduce((acc, data) => acc + data[key], 0);
