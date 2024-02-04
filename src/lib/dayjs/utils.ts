import dayjs from "dayjs";
import { DEFAULT_DATE_FORMAT } from "./constants";

export type TimeUnit = "days" | "weeks" | "months" | "years";

export const formatDate = (date: Date) =>
	dayjs(date).format(DEFAULT_DATE_FORMAT);

export const currentDate = (format?: string) =>
	dayjs().format(format ?? DEFAULT_DATE_FORMAT);

export const dateInFuture = (
	inDays: number,
	timeUnit?: TimeUnit,
	format?: string,
) =>
	dayjs()
		.add(inDays, timeUnit ?? "day")
		.format(format ?? DEFAULT_DATE_FORMAT);

export const dateInPast = (
	daysAgo: number,
	timeUnit?: TimeUnit,
	format?: string,
) =>
	dayjs()
		.subtract(daysAgo, timeUnit ?? "day")
		.format(format ?? DEFAULT_DATE_FORMAT);

export const getDuration = (
	from: string,
	to: string | undefined,
): [number, TimeUnit] => {
	const duration = dayjs.duration({ days: dayjs(to).diff(from, "day") });
	const durationInDays = duration.asDays();

	if (durationInDays >= 400) {
		return [Math.floor(duration.asYears()) + 1, "years"];
	}

	if (durationInDays >= 60) {
		return [Math.floor(duration.asMonths()) + 1, "months"];
	}

	if (durationInDays >= 14) {
		return [Math.floor(duration.asWeeks()) + 1, "weeks"];
	}

	return [durationInDays, "days"];
};
