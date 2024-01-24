import {
	CustomControl,
	CustomControlProps,
} from "@/components/MapControlFactory";

export interface FilterControlProps extends CustomControlProps {
	filters?: string[];
}

export const FilterControl = ({ position, ...props }: FilterControlProps) =>
	CustomControl<FilterControlProps>({
		position: position ?? "top-right",
		...props,
	});
