import { useDateRangePickerContext } from "@/components/DateRangePicker";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { trpc } from "@/lib/trpc/client";
import { LineChart } from "../charts/LineChart";
import { formatHoursData } from "./utils";

const CardHoursClimbed = () => {
	const { date } = useDateRangePickerContext();

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

	const data = formatHoursData(sessions, date?.from, date?.to);

	const climbingHours = {
		id: "climbingHours",
		data,
	};

	return (
		<Card className="flex flex-col">
			<CardHeader>
				<CardDescription>Total Climbing Time</CardDescription>
				<CardTitle>{data.reduce((acc, val) => acc + val.y, 0)} Hours</CardTitle>
			</CardHeader>
			<CardContent>
				<LineChart className="aspect-[4/3]" chartData={climbingHours} />
			</CardContent>
		</Card>
	);
};

export default CardHoursClimbed;
