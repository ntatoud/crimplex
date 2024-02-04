import { useDatePickerContext } from "@/components/DatePicker";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DEFAULT_DATE_FORMAT } from "@/lib/dayjs/constants";
import { currentDate, dateInPast } from "@/lib/dayjs/utils";
import dayjs from "dayjs";
import { ReactNode } from "react";
import { DateRange } from "react-day-picker";

export const RangePresets = () => {
	return (
		<div className="flex flex-1 gap-1 w-full">
			<RangePresetsItem
				range={{
					from: new Date(dateInPast(7, "days")),
					to: new Date(currentDate()),
				}}
			>
				Last 7 days
			</RangePresetsItem>
			<RangePresetsItem
				range={{
					from: new Date(dateInPast(30, "days")),
					to: new Date(currentDate()),
				}}
			>
				Last 30 days
			</RangePresetsItem>
			<RangePresetsItem
				range={{
					from: new Date(dateInPast(6, "months")),
					to: new Date(currentDate()),
				}}
			>
				Last 6 Months
			</RangePresetsItem>
			<RangePresetsItem
				range={{
					from: new Date(dateInPast(1, "years")),
					to: new Date(currentDate()),
				}}
			>
				Last year
			</RangePresetsItem>
			<Separator orientation="vertical" />
			<RangePresetsItem
				range={{
					from: new Date(
						dayjs()
							.startOf("week")
							.subtract(7, "day")
							.format(DEFAULT_DATE_FORMAT),
					),
					to: new Date(dayjs().format("YYYY-MM-DDT23:59:59Z")),
				}}
			>
				This Week
			</RangePresetsItem>
			<RangePresetsItem
				range={{
					from: new Date(dayjs().startOf("month").format(DEFAULT_DATE_FORMAT)),
					to: new Date(dayjs().format(DEFAULT_DATE_FORMAT)),
				}}
			>
				This Month
			</RangePresetsItem>
			<RangePresetsItem
				range={{
					from: new Date(dayjs().startOf("year").format(DEFAULT_DATE_FORMAT)),
					to: new Date(dayjs().format(DEFAULT_DATE_FORMAT)),
				}}
			>
				This year
			</RangePresetsItem>
		</div>
	);
};

const RangePresetsItem = ({
	range,
	children,
}: { range: DateRange; children: ReactNode }) => {
	const { date, setDate } = useDatePickerContext();

	const isActive =
		dayjs(date?.from).format(DEFAULT_DATE_FORMAT) ===
			dayjs(range?.from).format(DEFAULT_DATE_FORMAT) &&
		dayjs(date?.to).format(DEFAULT_DATE_FORMAT) ===
			dayjs(range?.to).format(DEFAULT_DATE_FORMAT);

	return (
		<Button
			variant={isActive ? "default" : "outline"}
			onClick={() => {
				setDate(range);
			}}
		>
			{children}
		</Button>
	);
};
