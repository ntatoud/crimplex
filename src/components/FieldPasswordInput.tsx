import { KeyboardEvent, RefObject, forwardRef, useRef, useState } from "react";

import { Eye, EyeOff } from "lucide-react";
import zxcvbn, { ZXCVBNScore } from "zxcvbn";

import { cn } from "@/lib/utils";
import FloatingLabel from "./FloatingLabel";
import { Button } from "./ui/button";
import { Input, InputProps } from "./ui/input";
import { Progress } from "./ui/progress";

const progressBar: Record<
	ZXCVBNScore,
	{ label: string; value: number; bg: string; text: string }
> = {
	0: {
		label: "Very weak",
		value: 20,
		bg: "bg-red-700",
		text: "text-red-700",
	},
	1: {
		label: "Weak",
		value: 40,
		bg: "bg-red-500",
		text: "text-red-500",
	},
	2: {
		label: "Medium",
		value: 60,
		bg: "bg-orange-500",
		text: "text-orange-500",
	},
	3: {
		label: "Strong",
		value: 80,
		bg: "bg-green-500",
		text: "text-green-500",
	},
	4: {
		label: "Very strong",
		value: 100,
		bg: "bg-green-700",
		text: "text-green-700",
	},
} as const;

const usePasswordStrength = (
	passwordRef: RefObject<HTMLInputElement>,
	showStrength: boolean,
) => {
	const [strength, setStrength] = useState<ZXCVBNScore | 5>(5);

	if (!showStrength) {
		// if we don't want to show the strength, return early to avoid computations
		return { strength, handleChange: () => {} };
	}

	const handler = () => {
		setStrength(zxcvbn(passwordRef.current?.value ?? "").score);
	};
	return { strength, handleChange: handler };
};
interface FieldPasswordInputProps extends InputProps {
	showStrength?: boolean;
	error?: string;
}
const FieldPasswordInput = forwardRef<HTMLDivElement, FieldPasswordInputProps>(
	({ showStrength = false, error, ...inputProps }, ref) => {
		const [showPassword, setShowPassword] = useState(false);

		const passwordRef = useRef<HTMLInputElement>(null);
		const { strength, handleChange } = usePasswordStrength(
			passwordRef,
			showStrength,
		);

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Enter") {
				const submitButton = document.querySelector(
					'button[type="submit"]',
				) as HTMLElement;

				submitButton?.focus();
			}
		};
		return (
			<div className="flex flex-col gap-2" ref={ref} onKeyDown={handleKeyDown}>
				<div
					className={cn(
						"relative flex pr-2 gap-1 items-center h-12 w-full rounded-md border border-input bg-background text-md ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
						"focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-0 focus-visible:border-none",
						error ? "ring-2 ring-red-500" : "",
					)}
				>
					<Input
						ref={passwordRef}
						type={showPassword ? "text" : "password"}
						onKeyUp={handleChange}
						className="peer h-10 border-none focus-visible:ring-0 group"
						placeholder=" "
						{...inputProps}
					/>
					<FloatingLabel
						htmlFor={inputProps.id}
						className={cn("-top-0.5", error ? "text-red-500" : "")}
					>
						Password
					</FloatingLabel>
					<Button
						variant="ghost"
						size="icon"
						className="hover:bg-background"
						tabIndex={-1}
						onClick={(event) => {
							event.preventDefault();
							setShowPassword(!showPassword);
						}}
						aria-label={showPassword ? "Hide password" : "Show Password"}
					>
						{showPassword ? (
							<Eye className="w-5" />
						) : (
							<EyeOff className="w-5" />
						)}
					</Button>
				</div>
				{showStrength && strength !== 5 && (
					<div className="flex flex-col">
						<Progress
							indicatorColor={progressBar[strength].bg}
							className="w-full h-1.5"
							value={progressBar[strength].value}
						/>

						<p
							className={`first-letter:uppercase ${progressBar[strength].text}`}
						>
							{progressBar[strength].label}
						</p>
					</div>
				)}
				{error && <p className="text-sm text-red-500">{error}</p>}
			</div>
		);
	},
);
FieldPasswordInput.displayName = "PasswordInput";

export default FieldPasswordInput;
