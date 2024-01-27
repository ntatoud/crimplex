import LogoUploadThing from "@/components/Icons/LogoUploadThing";
import { buttonVariants } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { env } from "@/env.mjs";
import { ArrowRight, ExternalLink } from "lucide-react";

const GB_IN_BYTE = 1000000000;

export type UploadThingUsageInfo = {
	totalBytes: number;
	appTotalBytes: number;
	filesUploaded: number;
	limitBytes: number;
};

export default async function UploadThingDataCard() {
	const infos = (await fetch("https://uploadthing.com/api/getUsageInfo", {
		method: "POST",
		headers: {
			"X-Uploadthing-Api-Key": env.UPLOADTHING_SECRET,
		},
	}).then((res) => res.json())) as UploadThingUsageInfo;

	return (
		<Card>
			<CardHeader>
				<div className="flex gap-1">
					<LogoUploadThing /> <ExternalLink />
				</div>
			</CardHeader>
			<CardContent>
				<DisplayUploadedFilesCount fileCount={infos.filesUploaded} />
				<DisplayGbRatio
					current={infos.appTotalBytes}
					limit={infos.limitBytes}
				/>
			</CardContent>
			<CardFooter>
				<div className="flex w-full justify-end">
					<a
						className={buttonVariants({
							variant: "ghost",
						})}
						href="https://uploadthing.com/dashboard/6810kblkdb"
					>
						See more
						<ArrowRight className="h-4 w-4" />
					</a>
				</div>
			</CardFooter>
		</Card>
	);
}

const DisplayUploadedFilesCount = ({ fileCount }: { fileCount: number }) => {
	return (
		<span className="flex gap-1 items-end">
			<p className="font-semibold text-lg text-gray-700 dark:text-gray-500">
				Uploaded files :
			</p>
			<p className="text-2xl font-bold">{fileCount}</p>
		</span>
	);
};

const DisplayGbRatio = ({
	current,
	limit,
}: { current: number; limit: number }) => {
	return (
		<div className="flex flex-col items-end w-full">
			<span className="flex items-end gap-1">
				<p className="font-semibold text-lg">
					{(current / GB_IN_BYTE).toFixed(2)}Gb
				</p>
				/
				<p className="font-semibold text-md text-muted-foreground">
					{(limit / GB_IN_BYTE).toFixed(2)}Gb
				</p>
			</span>
			<Progress
				indicatorColor="bg-red-500"
				className="w-full h-1.5"
				value={(100 * current) / limit}
			/>
		</div>
	);
};
