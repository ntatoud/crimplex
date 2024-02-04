import {
	DAILY_DATE_FORMAT,
	DEFAULT_DATE_FORMAT,
	MONTHLY_DATE_FORMAT,
	YEARLY_DATE_FORMAT,
} from "@/lib/dayjs/constants";
import { TimeUnit, getDuration } from "@/lib/dayjs/utils";
import { ClimbingSession } from "@prisma/client";
import dayjs from "dayjs";

const GROUPING_FORMAT = {
	days: DAILY_DATE_FORMAT,
	months: MONTHLY_DATE_FORMAT,
	years: YEARLY_DATE_FORMAT,
};

export const groupingDateFormat = (date: Date, groupBy: TimeUnit) => {
	if (groupBy === "weeks")
		return String(
			`${dayjs(date).startOf("week").format("MM/DD")}-${dayjs(date)
				.endOf("week")
				.format("MM/DD YY")}`,
		);

	return dayjs(date).format(GROUPING_FORMAT[groupBy]);
};
export const groupByDate = (
	sessions: ClimbingSession[],
	groupBy: TimeUnit,
	field: "duration" | "numClimbs",
) =>
	sessions.reduce(
		(group: { [key: string]: number }, session: ClimbingSession) => {
			const formattedDate = groupingDateFormat(session.date, groupBy);

			if (!group[formattedDate]) {
				group[formattedDate] = 0;
			}

			// Push the current item to the array for this date
			group[formattedDate] += session[field];

			return group;
		},
		{},
	);

export const formatHoursData = (
	sessions: ClimbingSession[],
	from?: Date,
	to?: Date,
) => {
	const [length, unit] = getDuration(
		dayjs(from).format(DEFAULT_DATE_FORMAT),
		dayjs(to).format(),
	);
	const groupedSessions = groupByDate(sessions, unit, "duration");

	const rangeData = Array.from({ length }, (_, index) => ({
		x: groupingDateFormat(dayjs(from).add(index, unit).toDate(), unit),
		y: 0,
	}));

	return rangeData.map(({ x }) => ({
		x,
		y: groupedSessions[x] ?? 0,
	}));
};

export const formatNumberData = (
	sessions: ClimbingSession[],
	from?: Date,
	to?: Date,
) => {
	const [length, unit] = getDuration(
		dayjs(from).format(DEFAULT_DATE_FORMAT),
		dayjs(to).format(),
	);
	const groupedSessions = groupByDate(sessions, unit, "numClimbs");

	const rangeData = Array.from({ length }, (_, index) => ({
		x: groupingDateFormat(dayjs(from).add(index, unit).toDate(), unit),
		blocks: 0,
		routes: 0,
	}));

	return rangeData.map(({ x }) => ({
		x,
		blocks: groupedSessions[x] ?? 0,
		routes: 0,
	}));
};
