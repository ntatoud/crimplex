"use client";

// import { Background } from "@/components/Icons/Background";
import { Button } from "@/components/ui/button";
import useBreakpoints from "@/hooks/useBreakpoints";
import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Quicksand, Source_Sans_3 } from "next/font/google";
import Image from "next/image";
import { useRef } from "react";

const quicksand = Quicksand({ subsets: ["latin"] });
const sourceSans = Source_Sans_3({ subsets: ["latin"] });
const PageHome = () => {
	const containerRef = useRef(null);
	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start start", "end end"],
	});
	const isSmall = useBreakpoints({ below: "xl" });
	const isMobile = useBreakpoints({ below: "md" });
	const md = useTransform(scrollYProgress, [0, 1], ["-10rem", "0rem"]);

	const lg = useTransform(scrollYProgress, [0, 1], ["-15rem", "0rem"]);
	const lgX = useTransform(scrollYProgress, [0, 1], [0, -200]);
	const smX = useTransform(scrollYProgress, [0, 1], ["50vw", "52vw"]);
	const scale = useTransform(scrollYProgress, [0, 1], [1.3, 1]);
	const title = useTransform(scrollYProgress, [0, 1], ["23rem", "27rem"]);
	const blur = useTransform(
		scrollYProgress,
		[0, 1],
		["blur(6px)", "blur(2px)"],
	);

	const reverseOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
	return (
		<div
			className="relative flex flex-1 w-screen xl:h-[130vh] overflow-hidden"
			ref={containerRef}
		>
			<div
				className={
					isSmall
						? "absolute w-[300vw] aspect-[3/2]"
						: "absolute xl:w-screen xl:aspect-[3/2] top-0"
				}
			>
				<Image src="/background/Background.svg" alt="background image" fill />
			</div>
			<motion.div
				style={{
					left: lgX,
					top: 0,
					transitionBehavior: "allow-discrete",
				}}
				className="absolute aspect-[3/2]"
			>
				<Image src="/background/Layer4.svg" alt="background image" fill />
			</motion.div>
			<motion.div
				style={{
					filter: blur,
					backdropFilter: blur,
				}}
				className="absolute bottom-0 right-0 w-screen aspect-[3/2]"
			>
				<Image src="/background/Layer3.svg" alt="background image" fill />
			</motion.div>
			<motion.div
				style={{ bottom: md }}
				className="absolute right-0 w-screen aspect-[3/2]"
			>
				<Image src="/background/Layer2.svg" alt="background image" fill />
			</motion.div>

			<motion.div
				style={{
					bottom: isMobile ? "-20rem" : lg,
					left: isMobile ? "-30rem" : 0,
				}}
				className="fixed h-screen md:h-fit md:w-screen aspect-[3/2]"
			>
				<Image src="/background/Layer1.svg" alt="background image" fill />
			</motion.div>
			<motion.div
				className={cn(
					"flex flex-1 flex-col items-center justify-center z-50 text-7xl font-bold md:ml-96 xl:ml-0 xl:block xl:absolute",
				)}
				style={{
					top: isSmall ? "20rem" : title,
					left: isSmall ? 0 : smX,
					scale: scale,
				}}
			>
				CRIMPLEX
				<div
					className={cn(
						"text-2xl font-semibold text-muted-foreground transition-300",
						sourceSans.className,
					)}
				>
					Climbing has never been so easy.
				</div>
				{!isSmall && (
					<motion.div
						style={{ opacity: reverseOpacity }}
						className="flex w-full justify-center my-5 cursor-pointer hover:drop-shadow-sm"
					>
						<ChevronDown
							className="w-10 h-10 animate-bounce"
							onClick={() => window.scroll({ behavior: "smooth", top: 1080 })}
						/>
					</motion.div>
				)}
				<motion.div
					style={{ opacity: isMobile ? 1 : scrollYProgress }}
					className="flex flex-col w-[80vw] sm:w-[50%] md:w-[80%] md:max-w-[40vw] lg:max-w-[35vw] gap-2 my-5"
				>
					<Button size="lg">Open the map</Button>
					<Button size="lg">Plan a trip</Button>
					<Button size="lg">Train</Button>
				</motion.div>
			</motion.div>
			<a
				className="absolute bottom-1 right-1"
				href="https://fr.freepik.com/vecteurs-libre/fond-aventure-plat-montagnes_16534142.htm#query=adventures&position=14&from_view=search&track=sph&uuid=d869f901-95b4-4ea9-b84b-b2f0759cf2af"
			>
				Image de Freepik
			</a>
			{/* <Background /> */}
			{/* <Perks /> */}
		</div>
	);
};

export default PageHome;
