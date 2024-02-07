"use client";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Control, Controller } from "react-hook-form";
import { Label } from "./ui/label";

export interface FieldDatePickerProps {
	name: string;
	label: string;
	error?: string;
	control: Control<ExplicitAny>;
	maxDate?: Date;
	minDate?: Date;
	required?: boolean;
}

export const FieldDatePicker = (props: FieldDatePickerProps) => {
	return (
		<Controller
			control={props.control}
			name={props.name}
			defaultValue={new Date()}
			render={({ field }) => (
				<div className="flex flex-col gap-0.5 w-full items-start">
					<Label className="flex items-center text-sm text-muted-foreground ml-3">
						{props.label}
						{props.required && <p className="text-xs text-red-500">*</p>}
					</Label>
					<Popover>
						<PopoverTrigger asChild>
							<Button
								variant={"outline"}
								className={cn(
									"w-full h-12 justify-start text-left font-normal text-md",
									!field.value && "text-muted-foreground",
								)}
							>
								<CalendarIcon className="mr-2 h-4 w-4" />
								{field.value ? (
									format(field.value, "PPP")
								) : (
									<span>Pick a date</span>
								)}
							</Button>
						</PopoverTrigger>
						<PopoverContent className="w-auto p-0" align="center">
							<Calendar
								mode="single"
								selected={field.value}
								onSelect={(date) => field.onChange(date)}
								fromDate={props.minDate}
								toDate={props.maxDate}
								initialFocus
							/>
						</PopoverContent>
					</Popover>
					{!!props.error && (
						<p className="text-sm text-red-500">{props.error}</p>
					)}
				</div>
			)}
		/>
	);
};
