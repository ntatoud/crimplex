"use client";
import { cn } from "@/lib/utils";
import { AlertTriangle, Bug } from "lucide-react";
import { Source_Sans_3 } from "next/font/google";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

const sourceSans = Source_Sans_3({ subsets: ["latin"] });

const BetaTag = () => {
	return (
		<div
			className={cn(
				"absolute w-full font-bold text-white h-1 bg-yellow-600 z-50",
				sourceSans.className,
			)}
		>
			<div className="absolute flex items-center top-0 left-2 bg-yellow-600 px-2 py-1 rounded-b-lg">
				<AlertTriangle className="h-4 w-4 mr-1" /> BETA
			</div>
			<Tooltip>
				<TooltipTrigger asChild>
					<a
						href="https://github.com/ntatoud/crimplex/issues"
						className="absolute hidden md:flex top-0 right-2 items-center bg-yellow-600 px-2 py-1 rounded-b-lg underline hover:scale-105 transition-all"
						aria-label="Report a bug"
						target="_blank"
						rel="noreferrer"
					>
						<Bug className="h-5 w-5" />
					</a>
				</TooltipTrigger>
				<TooltipContent className="bg-yellow-600 underline">
					<a
						href="https://github.com/ntatoud/crimplex/issues"
						target="_blank"
						className="text-white"
						rel="noreferrer"
					>
						Report a bug
					</a>
				</TooltipContent>
			</Tooltip>
		</div>
	);
};

export default BetaTag;
