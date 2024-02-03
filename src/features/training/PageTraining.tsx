import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import CardBestGrade from "./CardBestGrade";
import CardBlocksClimbed from "./CardBlocksClimbed";
import CardHoursClimbed from "./CardHoursClimbed";

export type TimeRange = "week" | "month" | "year";
const PageTraining = () => {
	const [range, setRange] = useState<TimeRange>("week");
	return (
		<MaxWidthWrapper>
			<div className="flex flex-1 flex-col my-5">
				<h2 className="text-3xl font-bold mb-3">Progress</h2>
				<Tabs defaultValue="overview" className="w-full">
					<TabsList className="grid w-full grid-cols-3">
						<TabsTrigger value="overview">Overview</TabsTrigger>
						<TabsTrigger value="Leaderboard">Leaderboard</TabsTrigger>
						<TabsTrigger value="Achievments">Achievments</TabsTrigger>
					</TabsList>
					<TabsContent value="overview" className="flex flex-col gap-2">
						<div className="flex flex-1 gap-1 w-full">
							<Button className="outline" onClick={() => setRange("week")}>
								Week
							</Button>
							<Button className="outline" onClick={() => setRange("month")}>
								Mounth
							</Button>
							<Button className="outline" onClick={() => setRange("year")}>
								Year
							</Button>
						</div>
						<Separator />
						<h3 className="text-xl font-semibold text-muted-foreground">
							This {range}
						</h3>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
							<CardHoursClimbed range={range} />
							<CardBlocksClimbed range={range} />
							<CardBestGrade range={range} />
						</div>
					</TabsContent>
					<TabsContent value="Leaderboard">Leaderboard</TabsContent>
					<TabsContent value="Achievments">Achievments</TabsContent>
				</Tabs>
			</div>
		</MaxWidthWrapper>
	);
};

export default PageTraining;
