import colors from "@/theme/colors";
import { ResponsiveBar } from "@nivo/bar";
import { useTheme } from "next-themes";
import { HTMLAttributes } from "react";
import { ChartData } from "./schema";
import { useChartTheme } from "./theme";

const barData = { routes: 0, blocks: 0 };
export type BarData = typeof barData;
export interface BarChartProps extends HTMLAttributes<HTMLDivElement> {
	chartData: ChartData<BarData>;
}

/**
 *  function components defaultProps support warning : https://github.com/plouc/nivo/issues/2415
 */
export const BarChart = ({ chartData, ...props }: BarChartProps) => {
	const { resolvedTheme } = useTheme();
	const isDark = resolvedTheme === "dark";

	const theme = useChartTheme(isDark);
	const t = Object.keys(barData).sort();
	return (
		<div {...props}>
			<ResponsiveBar
				data={chartData}
				keys={t}
				indexBy="x"
				margin={{ top: 10, right: 0, bottom: 40, left: 40 }}
				padding={0.3}
				groupMode="stacked"
				colors={[colors.green[600], colors.green[300]]}
				axisBottom={{
					tickSize: 0,
					tickPadding: 16,
				}}
				axisLeft={{
					tickSize: 0,
					tickValues: 4,
					tickPadding: 16,
				}}
				gridYValues={4}
				theme={theme}
				tooltipLabel={({ id }) => `${id}`}
				enableLabel={false}
				role="application"
				ariaLabel="A bar chart showing data"
			/>
		</div>
	);
};
