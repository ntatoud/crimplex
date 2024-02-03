import colors from "@/theme/colors";

export const useChartTheme = (isDark: boolean) => {
	return {
		tooltip: {
			chip: {
				borderRadius: "9999px",
			},
			container: {
				fontSize: "12px",
				textTransform: "capitalize",
				borderRadius: "6px",
				background: isDark ? colors.gray[900] : colors.gray[50],
			},
		},
		grid: {
			line: {
				stroke: isDark ? colors.gray[800] : colors.gray[200],
			},
		},
		text: {
			fill: colors.gray[500],
		},
		legends: {
			text: {
				fill: isDark ? colors.gray[200] : colors.gray[600],
			},
		},
		annotations: {
			text: {
				fill: isDark ? colors.gray[200] : colors.gray[600],
			},
		},
		labels: {
			text: {
				fill: isDark ? colors.gray[200] : colors.gray[600],
			},
		},
		markers: {
			lineColor: isDark ? colors.gray[200] : colors.gray[600],
			lineStrokeWidth: 1,
		},
	} as const;
};
