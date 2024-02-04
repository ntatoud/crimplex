"use client";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import * as React from "react";
import { DateRange } from "react-day-picker";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { currentDate } from "@/lib/dayjs/utils";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";

type DatePickerContextProps = {
	date?: DateRange;
	setDate: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
	error: string;
	setError: React.Dispatch<React.SetStateAction<string>>;
};

export const DatePickerContext =
	React.createContext<DatePickerContextProps | null>(null);

export const useDatePickerContext = () => {
	const ctx = React.useContext(DatePickerContext);
	if (ctx === null) {
		throw new Error("Missing parent <DatePicker.Provider> component");
	}
	return ctx;
};

export function DatePicker({
	className,
}: React.HTMLAttributes<HTMLDivElement>) {
	const { date, setDate, setError } = useDatePickerContext();

	if ((date?.from && !date?.to) || (date?.to && !date.from))
		setError("Please select a valid date range");

	return (
		<div className={cn("grid gap-2", className)}>
			<Popover>
				<PopoverTrigger asChild>
					<Button
						id="date"
						variant={"outline"}
						className={cn(
							"w-[300px] justify-start text-left font-normal",
							!date && "text-muted-foreground",
						)}
						onClick={() => setError("")}
					>
						<CalendarIcon className="mr-2 h-4 w-4" />
						{date?.from ? (
							date.to ? (
								<>
									{format(date.from, "LLL dd, y")} -{" "}
									{format(date.to, "LLL dd, y")}
								</>
							) : (
								format(date.from, "LLL dd, y")
							)
						) : (
							<span>Pick a date</span>
						)}
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-auto p-0" align="start">
					<Calendar
						initialFocus
						mode="range"
						defaultMonth={dayjs(date?.to).subtract(1, "month").toDate()}
						selected={date}
						onSelect={(event) => {
							setDate(event);
							setError("");
						}}
						numberOfMonths={2}
						toDate={new Date(currentDate())}
					/>
				</PopoverContent>
			</Popover>
		</div>
	);
}
