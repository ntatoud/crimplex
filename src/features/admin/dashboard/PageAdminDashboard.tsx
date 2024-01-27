import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import UploadThingDataCard from "./UploadThingDataCard";

const PageAdminDashboard = () => {
	return (
		<MaxWidthWrapper className="max-w-screen-lg">
			<div className="flex flex-col flex-1 items-center mt-5">
				<h1 className="font-bold text-xl w-full text-left">Dashboard</h1>
				<div className="grid grid-cols-1 lg:grid-cols-2 w-full gap-4 my-4">
					<UploadThingDataCard />
					<Card>
						<CardHeader>
							<CardTitle>My card</CardTitle>
						</CardHeader>
						<CardContent>My card content</CardContent>
						<CardFooter> My card footer</CardFooter>
					</Card>
				</div>
			</div>
		</MaxWidthWrapper>
	);
};

export default PageAdminDashboard;
