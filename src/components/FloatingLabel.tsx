import { cn } from "@/lib/utils";
import { LabelProps } from "@radix-ui/react-label";
import { FC, ReactNode } from "react";
import { Label } from "./ui/label";

interface FloatingLabelProps extends LabelProps {
	children: ReactNode;
}

/**
 * - Don't forget to add 'peer' className to associated input
 * - Don't forget to add placeholder=" " to associated input
 * - Wrap the Field in a relative div
 */
const FloatingLabel: FC<FloatingLabelProps> = ({
	children,
	className,
	...props
}) => {
	return (
		<Label
			className={cn(
				"absolute text-muted-foreground transform -translate-y-3 duration-200 z-10 origin-[0] bg-background px-2 peer-focus:text-primary peer-placeholder-shown:scale-95 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-0.5 peer-focus:scale-95 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 pointer-events-none",
				className,
			)}
			{...props}
		>
			{children}
		</Label>
	);
};

export default FloatingLabel;
