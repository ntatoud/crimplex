import * as React from "react";

import { Slot } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const buttonVariants = cva(
	"inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
	{
		variants: {
			variant: {
				default: "bg-primary text-primary-foreground hover:bg-primary/90",
				destructivePrimary:
					"bg-destructive text-destructive-foreground hover:bg-destructive/90",
				destructiveSecondary:
					"border border-destructive bg-destructive/20 text-destructive hover:bg-destructive/30 dark:text-red-100 dark:bg-destructive/60 dark:hover:bg-destructive/70",
				outline:
					"border border-input bg-background hover:bg-accent hover:text-accent-foreground",
				secondary:
					"bg-secondary text-primary border border-zinc-300 dark:border-zinc-700 hover:bg-secondary/80",
				ghost: "hover:bg-accent hover:text-accent-foreground",
				link: "text-primary underline-offset-4 hover:underline",
			},
			size: {
				default: "h-10 px-4 py-2",
				sm: "h-9 rounded-md px-3",
				lg: "h-14 text-xl rounded-md px-8",
				icon: "h-10 w-10",
			},
			isLoading: {
				true: true,
				false: false,
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
			isLoading: false,
		},
	},
);

interface ShadcnButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean;
}

const ShadcnButton = React.forwardRef<HTMLButtonElement, ShadcnButtonProps>(
	({ className, variant, size, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : "button";
		return (
			<Comp
				className={cn(buttonVariants({ variant, size, className }))}
				ref={ref}
				{...props}
			/>
		);
	},
);
ShadcnButton.displayName = "Button";

export interface ButtonProps extends ShadcnButtonProps {
	isLoading?: boolean;
}
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ isLoading, children, ...props }, ref) => {
		return (
			<ShadcnButton ref={ref} {...props}>
				{isLoading ? <Loader2 className="animate-spin h-6 w-6" /> : children}
			</ShadcnButton>
		);
	},
);

export { Button, buttonVariants };
