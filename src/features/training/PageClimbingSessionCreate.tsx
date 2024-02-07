import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import ClimbingSessionCreateForm from "./ClimbingSessionCreateForm";

const PageClimbingSessionCreate = () => {
	const router = useRouter();
	return (
		<MaxWidthWrapper>
			<div className="flex flex-col flex-1 my-5">
				<div className="flex flex-1 justify-start items-center mb-5 gap-4">
					<Button size="icon" variant="outline" onClick={() => router.back()}>
						<ArrowLeft className="w-5 h-5" />
					</Button>
					<h2 className="text-3xl font-bold">New climbing session</h2>
				</div>
				<div className="flex flex-1items-center justify-center">
					<Card>
						<CardHeader>
							<CardTitle>Sessions details</CardTitle>
						</CardHeader>
						<CardContent>
							<ClimbingSessionCreateForm />
						</CardContent>
					</Card>
				</div>
			</div>
		</MaxWidthWrapper>
	);
};

export default PageClimbingSessionCreate;
