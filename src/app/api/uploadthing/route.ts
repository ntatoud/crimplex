import { createNextRouteHandler } from "uploadthing/next";

import { uploadRouter } from "@/server/router";

// Export routes for Next App Router
export const { GET, POST } = createNextRouteHandler({
	router: uploadRouter,
});
