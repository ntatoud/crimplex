"use client";
import { Monitor, MoonStar, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "../ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const ColorModeToggle = ({
	showLabel = false,
}: {
	showLabel?: boolean;
}) => {
	const { setTheme } = useTheme();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="outline"
					size={showLabel ? "default" : "icon"}
					className="group"
				>
					<div className="flex items-center rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0">
						<Sun className="h-6 w-6 group-hover:text-yellow-600" />
						{showLabel && <p className="ml-2">Light</p>}
					</div>
					<div className="absolute flex items-center rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100">
						<MoonStar className="h-6 w-6 group-hover:text-sky-700" />
						{showLabel && <p className="ml-2">Dark</p>}
					</div>
					<span className="sr-only">Toggle theme</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem
					onClick={() => setTheme("light")}
					className="hover:cursor-pointer"
				>
					<Sun className="mr-2 h-5 w-5 text-muted-foreground" strokeWidth="1" />
					Light
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={() => setTheme("dark")}
					className="hover:cursor-pointer"
				>
					<MoonStar
						className="mr-2 h-5 w-5 text-muted-foreground"
						strokeWidth="1"
					/>
					Dark
				</DropdownMenuItem>

				<DropdownMenuItem
					onClick={() => setTheme("system")}
					className="hover:cursor-pointer"
				>
					<Monitor
						className="mr-2 h-5 w-5 text-muted-foreground"
						strokeWidth="1"
					/>
					System
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default ColorModeToggle;
