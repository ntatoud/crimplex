type UploadMode = "single" | "multiple";

export type FileUpdater<T extends UploadMode> = T extends "single"
	? (key: string) => void
	: (keys: string[]) => void;
