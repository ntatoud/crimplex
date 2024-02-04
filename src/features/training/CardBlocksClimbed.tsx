import { useDatePickerContext } from "@/components/DatePicker";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { trpc } from "@/lib/trpc/client";
import { BarChart } from "../charts/BarChart";
import { formatNumberData } from "./utils";

const CardBlocksClimbed = () => {
	const { date } = useDatePickerContext();
	const { data: sessions } = trpc.training.getAllForUser.useQuery({
		nameFilter: {
			name: "",
		},
		dateFilter: {
			from: date?.from,
			to: date?.to,
		},
	});

	if (!sessions) return;

	const data = formatNumberData(sessions, date?.from, date?.to);
	return (
		<Card className="flex flex-col">
			<CardHeader>
				<CardDescription>Blocks Climbed</CardDescription>
				<CardTitle>
					{data.reduce((acc, val) => acc + val.blocks, 0)} Blocks{" "}
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
