import { FC } from "react";

import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import {
	FieldErrors,
	UseFormClearErrors,
	UseFormSetValue,
} from "react-hook-form";

import { cn } from "@/lib/utils";

interface PinInputProps {
	length?: number;
	onComplete?: (value: string) => void;
	isLoading?: boolean;
	setValue: UseFormSetValue<{
		code: string;
	}>;
	errors?: FieldErrors<{
		code: string;
	}>;
	clearErrors?: UseFormClearErrors<{
		code: string;
	}>;
}

const CodeInput: FC<PinInputProps> = ({
	length = 6,
	onComplete,
	isLoading = false,
	setValue,
	errors,
	clearErrors,
}) => {
	return (
		<div className="flex gap-2" onFocus={() => clearErrors?.()}>
			<PinInput
				id="code"
				size="lg"
				onComplete={onComplete}
				autoFocus
				isDisabled={isLoading}
				placeholder="·"
				onChange={(value) => setValue("code", value)}
			>
				{Array.from({ length }, (_, index) => (
					<PinInputField
						key={String(index)}
						className={cn(
							"w-14 h-14 text-center rounded-md border border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
							errors?.code ? "ring-1 ring-red-500" : "",
						)}
						fontSize="x-large"
					/>
				))}
			</PinInput>
		</div>
	);
};

export default CodeInput;
