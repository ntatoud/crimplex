import {
	DateRangePicker,
	DateRangePickerContext,
} from "@/components/DateRangePicker";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { currentDate, dateInPast } from "@/lib/dayjs/utils";
import { AlertTriangle, Plus } from "lucide-react";
import Link from "next/link";
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
			<DateRangePickerContext.Provider
				value={{ date, setDate, error, setError }}
			>
				<div className="flex flex-1 flex-col my-5">
					<div className="flex flex-1 justify-between items-center mb-3">
						<h2 className="text-3xl font-bold mb-3">Progress</h2>
						<Link className={buttonVariants()} href="/training/create">
							<Plus className="w-4 h-4 mr-1" />
							New session{" "}
						</Link>
					</div>
					<Tabs defaultValue="overview" className="w-full">
						<TabsList className="grid w-full grid-cols-3">
							<TabsTrigger value="overview">Overview</TabsTrigger>
							<TabsTrigger value="Leaderboard">Leaderboard</TabsTrigger>
							<TabsTrigger value="Achievments">Achievments</TabsTrigger>
						</TabsList>
						<TabsContent value="overview" className="flex flex-col gap-2">
							<DateRangePicker />
							{/* TODO : NAME FILTER */}
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
			</DateRangePickerContext.Provider>
		</MaxWidthWrapper>
	);
};

export default PageTraining;
