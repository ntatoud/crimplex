import colors from "@/theme/colors";
import { PointMouseHandler, ResponsiveLine } from "@nivo/line";
import { useTheme } from "next-themes";
import { HTMLAttributes } from "react";
import { ChartData } from "./schema";
import { useChartTheme } from "./theme";
import { cumSum } from "./utils";

export type LineData = { y: number };

export interface LineChartProps
	extends Omit<HTMLAttributes<HTMLDivElement>, "onClick"> {
	chartData: {
		id: string;
		data: ChartData<LineData>;
	};
	onClick?: PointMouseHandler;
}

/**
 *  function components defaultProps support warning : https://github.com/plouc/nivo/issues/2415
 */
export const LineChart = ({ chartData, onClick, ...props }: LineChartProps) => {
	const average = !chartData.data.length
		? 0
		: cumSum(chartData.data, "y") / chartData.data.length;

	const { resolvedTheme } = useTheme();
	const isDark = resolvedTheme === "dark";

	const theme = useChartTheme(isDark);
	return (
		<div {...props}>
			<ResponsiveLine
				data={[chartData]}
				margin={{ top: 10, right: 20, bottom: 40, left: 40 }}
				xScale={{
					type: "point",
				}}
				yScale={{
					type: "linear",
				}}
				curve="monotoneX"
				axisBottom={{
					tickSize: 0,
					tickPadding: 16,
				}}
				axisLeft={{
					tickSize: 0,
					tickValues: 5,
					tickPadding: 16,
				}}
				colors={colors.green[500]}
				lineWidth={3}
				pointSize={6}
				role="application"
				useMesh
				enableArea
				markers={[
					{
						axis: "y",
						legend: `Avg: ${average.toFixed(2)}h`,
						legendPosition: "top",
						value: average,
						textStyle: {
							fill: isDark ? colors.gray[200] : colors.gray[600],
						},
						lineStyle: {
							strokeDasharray: "5px",
						},
					},
				]}
				layers={["axes", "grid", "lines", "areas", "points", "markers", "mesh"]}
				theme={theme}
				animate={false}
				onClick={onClick}
			/>
		</div>
	);
};
