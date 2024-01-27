import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { UploadMode } from "@/types/uploadthing";
import { useDropzone } from "@uploadthing/react";
import { motion } from "framer-motion";
import { DownloadCloud, Laptop2 } from "lucide-react";
import {
	Dispatch,
	ReactNode,
	SetStateAction,
	useCallback,
	useState,
} from "react";
import { generateClientDropzoneAccept } from "uploadthing/client";

export interface FileInputProps {
	mode: UploadMode;
	files: File[];
	setFiles: Dispatch<SetStateAction<File[]>>;
	fileConfig: {
		fileTypes: string[];
		maxFileSize: string | undefined;
	};

	error: ReactNode;
}

export const FileInput = ({
	mode,
	files,
	setFiles,
	fileConfig,
	error,
}: FileInputProps) => {
	if (!!files.length && mode === "single") return null;

	const [isError, setIsError] = useState(false);

	const onDrop = useCallback(
		(acceptedFiles: File[]) => {
			setFiles(acceptedFiles);
			if (!acceptedFiles.length) {
				setIsError(true);
			}
		},
		[setFiles],
	);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		multiple: mode !== "single",
		accept: generateClientDropzoneAccept(fileConfig.fileTypes),
	});

	return (
		<div
			className={cn(
				"group relative flex flex-col gap-5 p-5 md:p-10 items-center justify-center w-full rounded-lg border-dashed border-2 border-input cursor-pointer",
				"hover:bg-foreground/5",
			)}
			{...getRootProps()}
		>
			<DragOverlay isDragActive={isDragActive} />
			<input {...getInputProps()} />
			<div className="flex flex-col items-center gap-1 text-lg">
				<span className="flex items-center">
					<p className="font-bold mr-1">Drag</p> files here.
				</span>
				<DownloadCloud className="w-8 h-8" />
			</div>
			<p className="text-sm text-muted-foreground font-semibold">OR</p>
			<Button variant="outline" className="gap-1 text-lg">
				<Laptop2 /> Import from your computer
			</Button>
			{isError && <div className="text-sm text-red-500">{error}</div>}
			<FileSizeWarning maxFileSize={fileConfig.maxFileSize} />
		</div>
	);
};

const DragOverlay = ({ isDragActive }: { isDragActive: boolean }) => {
	if (!isDragActive) return;

	const onDragAnimate = {
		ease: "ease-in-out",
		rotate: [0, 2.5, 0, -2.5, 0, 0, 0, 0, 0, 0],
		scale: [1, 1, 1, 1, 1, 1.05, 1.1, 1.2, 1.05, 1],
		transition: { duration: 1, repeat: Infinity, repeatDelay: 1 },
	};

	return (
		<div className="absolute flex w-full h-full items-center justify-center bg-background/90">
			<motion.div className="flex flex-col" whileInView={onDragAnimate}>
				<p className="font-bold text-2xl">Drop</p>
				<DownloadCloud className="w-14 h-14" />
			</motion.div>
		</div>
	);
};

const FileSizeWarning = ({ maxFileSize }: { maxFileSize?: string }) => {
	if (!maxFileSize) return;

	return (
		<span className="flex w-full justify-end items-center text-sm gap-1">
			Warning : Files should not be over
			<p className="font-semibold">{maxFileSize}</p>
		</span>
	);
};
