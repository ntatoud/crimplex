import { ReactNode, useState } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

import { motion } from "framer-motion";
const WorkInProgressWrapper = ({ children }: { children: ReactNode }) => {
	const [isHovered, setIsHovered] = useState(false);
	return (
		<div
			className="relative group outline-dashed outline-1 rounded-md text-muted-foreground"
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<Tooltip>
				<TooltipTrigger asChild>
					<div>
						<div className="absolute flex w-full h-full items-center justify-center font-bold cursor-pointer">
							🚧 WIP
							<motion.p
								className="absolute -right-5 -top-1 invisible group-hover:visible"
								whileInView={
									isHovered
										? {
												rotate: ["-10deg", "10deg", "50deg", "55deg", "60deg"],
												transition: {
													duration: 0.5,
													repeat: Infinity,
													repeatDelay: 0.2,
												},
										  }
										: {}
								}
								layout
							>
								🔨
							</motion.p>
						</div>
						<div className="opacity-25 pointer-events-none">{children}</div>
					</div>
				</TooltipTrigger>
				<TooltipContent>
					Patience! This will be available soon 🤫
				</TooltipContent>
			</Tooltip>
		</div>
	);
};

export default WorkInProgressWrapper;
