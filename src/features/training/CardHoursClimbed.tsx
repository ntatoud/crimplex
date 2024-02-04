import { useDatePickerContext } from "@/components/DatePicker";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { trpc } from "@/lib/trpc/client";
import { PointMouseHandler } from "@nivo/line";
import dayjs from "dayjs";
import { LineChart } from "../charts/LineChart";
import { formatHoursData } from "./utils";

const CardHoursClimbed = () => {
	const { date, setDate } = useDatePickerContext();

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

	const onClick: PointMouseHandler = (event) => {
		// TODO : Generalize for all date formats
		const clickedDate = dayjs(`2024-${event.data.x}`);

		const toDate = clickedDate.add(2, "days").toDate();
		const fromDate = clickedDate.subtract(1, "days").toDate();
		setDate({
			from: fromDate,
			to: toDate,
		});
	};
	return (
		<Card className="flex flex-col">
			<CardHeader>
				<CardDescription>Total Climbing Time</CardDescription>
				<CardTitle>
					{data.reduce((acc, val) => acc + val.y, 0)} Hours
					<span className="text-sm text-muted-foreground ml-1">(+12)</span>
				</CardTitle>
				<CardDescription className="text-green-600">+20.3%</CardDescription>
			</CardHeader>
			<CardContent>
				<LineChart
					className="aspect-[4/3]"
					chartData={climbingHours}
					onClick={onClick}
				/>
			</CardContent>
		</Card>
	);
};

export default CardHoursClimbed;
