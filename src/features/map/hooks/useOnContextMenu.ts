import { DEFAULT_ACTIVATION_WINDOW_TIME } from "../constants";

const useOnContextMenu = (customDelay?: number) => {
	return () => {
		const ctxMenuLayer = document.getElementById("context-menu-layer");
		if (ctxMenuLayer) {
			ctxMenuLayer.classList.remove("pointer-events-none");
			ctxMenuLayer.classList.add("pointer-events-auto");

			setTimeout(() => {
				ctxMenuLayer.classList.remove("pointer-events-auto");
				ctxMenuLayer.classList.add("pointer-events-none");
			}, customDelay ?? DEFAULT_ACTIVATION_WINDOW_TIME);
		}
	};
};

export default useOnContextMenu;
