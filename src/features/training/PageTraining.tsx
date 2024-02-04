import { DatePicker, DatePickerContext } from "@/components/DatePicker";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { currentDate, dateInPast } from "@/lib/dayjs/utils";
import { AlertTriangle } from "lucide-react";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import CardBlocksClimbed from "./CardBlocksClimbed";
import CardHoursClimbed from "./CardHoursClimbed";
import { RangePresets } from "./RangePresets";

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
							<RangePresets />
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
