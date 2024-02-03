import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { BarChart, BarData } from "../charts/BarChart";
import { ChartData } from "../charts/schema";
import { cumSum } from "../charts/utils";
import { TimeRange } from "./PageTraining";
import blocksData from "./config/blocks";

const CardBlocksClimbed = ({ range }: { range: TimeRange }) => {
	const data = blocksData[range] as ChartData<BarData>;
	return (
		<Card className="flex flex-col">
			<CardHeader>
				<CardDescription>Blocks Climbed</CardDescription>
				<CardTitle>
					{cumSum(data, "blocks")} blocks & {cumSum(data, "routes")} routes
				</CardTitle>
				<CardDescription className="text-green-600">+12.9%</CardDescription>
			</CardHeader>
			<CardContent>
				<BarChart className="aspect-[4/3]" chartData={data} />
			</CardContent>
		</Card>
	);
};

export default CardBlocksClimbed;
