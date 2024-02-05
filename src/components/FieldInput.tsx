import { cn } from "@/lib/utils";
import { forwardRef, useId } from "react";
import FloatingLabel from "./FloatingLabel";
import { Input, InputProps } from "./ui/input";

interface FieldInputProps extends InputProps {
	label?: string;
	error?: string;
}

const FieldInput = forwardRef<HTMLDivElement, FieldInputProps>(
	({ label, error, className, ...props }, ref) => {
		const id = useId();
		return (
			<div className="grid gap-1" ref={ref}>
				<div className="relative grid gap-1">
					<Input
						id={id}
						className={cn(
							"peer",
							error ? "ring-2 ring-red-500 " : "",
							className,
						)}
						placeholder=" "
						{...props}
					/>

					{label && (
						<FloatingLabel
							htmlFor={id}
							className={cn(
								"flex gap-1 ùitems-center",
								error ? "text-red-500" : "",
							)}
						>
							{label}
							{props.required && <p className="text-xs text-red-500">*</p>}
						</FloatingLabel>
					)}
				</div>
				{error && <p className="text-sm font-medium text-red-500">{error}</p>}
			</div>
		);
	},
);
FieldInput.displayName = "FieldInput";

export default FieldInput;
