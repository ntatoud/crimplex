import { ReactNode } from "react";

import { createRoot } from "react-dom/client";
import { ControlPosition, useControl } from "react-map-gl";

export class CustomControlClass {
	private _children: ReactNode;
	private _container: HTMLDivElement | undefined;
	private _className: string;
	constructor({
		children,
		className,
	}: { children: ReactNode; className?: string }) {
		this._children = children;
		this._className = className ?? "";
		this._container = undefined;
	}

	onAdd() {
		this._container = document.createElement("div");
		const root = createRoot(this._container);
		root.render(this._children);

		this._container.className = `${this._className} pointer-events-auto`;
		return this._container;
	}

	onRemove() {
		this._container?.parentNode?.removeChild(this._container);
	}
}

export interface CustomControlProps {
	children: ReactNode;
	className?: string;
	position?: ControlPosition;
}

export function CustomControl<T extends CustomControlProps>(props: T) {
	useControl(() => new CustomControlClass(props), {
		position: props.position,
	});
	return null;
}
