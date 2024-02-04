import { DatePicker, DatePickerContext } from "@/components/DatePicker";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DEFAULT_DATE_FORMAT } from "@/lib/dayjs/constants";
import { currentDate, dateInPast } from "@/lib/dayjs/utils";
import dayjs from "dayjs";
import { AlertTriangle } from "lucide-react";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import CardBlocksClimbed from "./CardBlocksClimbed";
import CardHoursClimbed from "./CardHoursClimbed";

const PageTraining = () => {
	const [date, setDate] = useState<DateRange | undefined>({
		from: new Date(dateInPast(7, "days")),
		to: new Date(currentDate()),
	});

	const [error, setError] = useState("");
	return (
		<MaxWidthWrapper>
			<DatePickerContext.Provider value={{ date, setDate, error, setError }}>
				<div className="flex flex-1 flex-col my-5">
					<h2 className="text-3xl font-bold mb-3">Progress</h2>
					<Tabs defaultValue="overview" className="w-full">
						<TabsList className="grid w-full grid-cols-3">
							<TabsTrigger value="overview">Overview</TabsTrigger>
							<TabsTrigger value="Leaderboard">Leaderboard</TabsTrigger>
							<TabsTrigger value="Achievments">Achievments</TabsTrigger>
						</TabsList>
						<TabsContent value="overview" className="flex flex-col gap-2">
							<DatePicker />
							<div className="flex flex-1 gap-1 w-full">
								<Button
									variant="outline"
									onClick={() => {
										setDate({
											from: new Date(dateInPast(7, "days")),
											to: new Date(currentDate()),
										});
									}}
								>
									Last 7 Days
								</Button>
								<Button
									variant="outline"
									onClick={() => {
										setDate({
											from: new Date(dateInPast(30, "days")),
											to: new Date(currentDate()),
										});
									}}
								>
									Last 30 days
								</Button>
								<Button
									variant="outline"
									onClick={() => {
										setDate({
											from: new Date(dateInPast(6, "months")),
											to: new Date(currentDate()),
										});
									}}
								>
									Last 6 months
								</Button>
								<Button
									variant="outline"
									onClick={() => {
										setDate({
											from: new Date(dateInPast(1, "years")),
											to: new Date(currentDate()),
										});
									}}
								>
									Last year
								</Button>
								<Separator orientation="vertical" />
								<Button
									variant="outline"
									onClick={() => {
										setDate({
											from: new Date(
												dayjs()
													.startOf("week")
													.subtract(7, "day")
													.format(DEFAULT_DATE_FORMAT),
											),
											to: new Date(dayjs().format("YYYY-MM-DDT23:59:59Z")),
										});
									}}
								>
									This Week
								</Button>
								<Button
									variant="outline"
									onClick={() => {
										setDate({
											from: new Date(
												dayjs().startOf("month").format(DEFAULT_DATE_FORMAT),
											),
											to: new Date(dayjs().format(DEFAULT_DATE_FORMAT)),
										});
									}}
								>
									This Mounth
								</Button>
								<Button
									variant="outline"
									onClick={() => {
										setDate({
											from: new Date(
												dayjs().startOf("year").format(DEFAULT_DATE_FORMAT),
											),
											to: new Date(dayjs().format(DEFAULT_DATE_FORMAT)),
										});
									}}
								>
									This Year
								</Button>
							</div>
							<Separator />
							{!error ? (
								<div className="grid grid-cols-1 md:grid-cols-2 gap-2">
									<CardHoursClimbed />
									<CardBlocksClimbed />
								</div>
							) : (
								<div className="flex flex-col h-80 items-center justify-center text-lg text-red-500">
									<AlertTriangle className="h-10 w-10" />
									<p>{error}</p>
								</div>
							)}
							{/* <CardBestGrade range={range} /> */}
						</TabsContent>
						<TabsContent value="Leaderboard">Leaderboard</TabsContent>
						<TabsContent value="Achievments">Achievments</TabsContent>
					</Tabs>
				</div>
			</DatePickerContext.Provider>
		</MaxWidthWrapper>
	);
};

export default PageTraining;
