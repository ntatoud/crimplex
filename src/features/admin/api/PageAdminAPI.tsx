import { API } from "@stoplight/elements";
import "@stoplight/elements/styles.min.css";

import useBreakpoints from "@/hooks/useBreakpoints";
const PageAdminAPI = () => {
	const isMobile = useBreakpoints({ below: "md" });
	return (
		<API
			apiDescriptionUrl="/api/openapi.json"
			layout={isMobile ? "stacked" : "sidebar"}
			router="memory"
		/>
	);
};

export default PageAdminAPI;
