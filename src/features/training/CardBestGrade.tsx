import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { TimeRange } from "./PageTraining";

const CardBestGrade = ({ range }: { range: TimeRange }) => {
	return (
		<Card className="flex flex-col h-fit">
			<CardHeader>
				<CardDescription>Hardest block climbed</CardDescription>
				<CardTitle>
					6c+
					<span className="text-sm text-muted-foreground ml-1">
						On the 24th of January 2024
					</span>
				</CardTitle>
				<CardDescription className="text-green-600">
					Red block at Arkose Rouen
				</CardDescription>
			</CardHeader>
		</Card>
	);
};

export default CardBestGrade;
