import { API } from "@stoplight/elements";
import "@stoplight/elements/styles.min.css";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import useBreakpoints from "@/hooks/useBreakpoints";
const PageAdminAPI = () => {
	const isMobile = useBreakpoints({ below: "md" });
	return (
		<MaxWidthWrapper className="relative max-w-[90vw]">
			<div className="absolute flex flex-col inset-0 overflow-auto p-4 lg:p-0">
				<API
					apiDescriptionUrl="/api/openapi.json"
					layout={isMobile ? "stacked" : "sidebar"}
					router="memory"
				/>
			</div>
		</MaxWidthWrapper>
	);
};

export default PageAdminAPI;
