import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

import Illustration from "../Illustration";
import { RegisterValidateForm } from "./RegisterValidateForm";

const PageRegisterValidate = () => {
	const router = useRouter();
	return (
		<div className="flex flex-1">
			<Illustration />
			<div className="flex flex-1 items-center justify-center py-2">
				<div className="flex flex-grow flex-col max-w-sm gap-14">
					<div className="flex flex-col items-center">
						<Button
							variant="outline"
							className="place-self-start w-fit"
							size="sm"
							onClick={() => router.back()}
						>
							<ArrowLeft />
							Back
						</Button>
					</div>

					<RegisterValidateForm />
				</div>
			</div>
		</div>
	);
};

export default PageRegisterValidate;
