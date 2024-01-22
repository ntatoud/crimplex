import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

import Illustration from "../Illustration";
import LoginForm from "./LoginForm";

const PageLogin = () => {
	return (
		<div className="flex flex-1">
			<Illustration />
			<div className="flex flex-1 items-center justify-center">
				<div className="flex flex-grow flex-col max-w-sm gap-10">
					<div className="flex flex-col items-start justify-center font-bold text-3xl">
						🧗🏼 Crimplex
						<p className="text-lg font-normal text-muted-foreground">
							Climbing has never been so easy.
						</p>
					</div>
					<div className="flex flex-col gap-5 items-center">
						<Link
							className={cn(
								buttonVariants({
									size: "lg",
									className: "w-full",
								}),
							)}
							href="/register"
						>
							Create an account
						</Link>
					</div>
					<div className="relative flex h-fit text-xs justify-center items-center w-full">
						<Separator className="w-full bg-muted-foreground" />
						<div className="absolute px-2 font-semibold bg-background text-muted-foreground">
							ALREADY HAVE AN ACCOUNT ?
						</div>
					</div>
					<LoginForm />
				</div>
			</div>
		</div>
	);
};

export default PageLogin;
