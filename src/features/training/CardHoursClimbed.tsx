import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { LineChart } from "../charts/LineChart";
import { cumSum } from "../charts/utils";
import { TimeRange } from "./PageTraining";
import hoursData from "./config/hours";

const CardHoursClimbed = ({ range }: { range: TimeRange }) => {
	const data = hoursData[range];
	const climbingHours = {
		id: "climbingHours",
		data: data,
	};

	return (
		<Card className="flex flex-col">
			<CardHeader>
				<CardDescription>Total Climbing Time</CardDescription>
				<CardTitle>
					{cumSum<{ y: number }>(data, "y")} Hours
					<span className="text-sm text-muted-foreground ml-1">(+12)</span>
				</CardTitle>
				<CardDescription className="text-green-600">+20.3%</CardDescription>
			</CardHeader>
			<CardContent>
				<LineChart className="aspect-[4/3]" chartData={climbingHours} />
			</CardContent>
		</Card>
	);
};

export default CardHoursClimbed;
