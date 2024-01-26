import { Button } from "@/components/ui/button";
import { useUploadThing } from "@/lib/uploadthing/client";
import { UploadEndpoint } from "@/server/router";
import { FileUpdater } from "@/types/uploadthing";
import { Upload } from "lucide-react";
import { FC, ReactNode, useState } from "react";
import { toast } from "sonner";
import { FileInput } from "./FileInput";
import { FilePreview } from "./FilePreview";

export type FieldFileUploadProps = {
	endpoint: UploadEndpoint;
	error: ReactNode;
} & (
	| {
			mode: "single";
			onUpload?: FileUpdater<"single">;
	  }
	| {
			mode: "multiple";
			onUpload?: FileUpdater<"multiple">;
	  }
);

const FieldFileUpload: FC<FieldFileUploadProps> = ({
	endpoint,
	error,
	mode,
	onUpload,
}) => {
	const [files, setFiles] = useState<File[]>([]);
	const isEmpty = !files.length;
	const { startUpload, isUploading, permittedFileInfo } = useUploadThing(
		endpoint,
		{
			onClientUploadComplete: (res) => {
				if (mode === "single") onUpload?.(res[0].key);
				else {
					onUpload?.(res.map((file) => file.key));
				}
				setFiles([]);
			},
			onUploadError: (error: Error) => {
				toast.error("Could not upload the image", {
					description: error.message,
				});
			},
		},
	);
	const fileTypes = permittedFileInfo?.config
		? Object.keys(permittedFileInfo?.config)
		: [];

	return (
		<div className="flex flex-col w-full items-center">
			{((isEmpty && mode === "single") || mode === "multiple") && (
				<FileInput
					mode={mode}
					files={files}
					setFiles={setFiles}
					fileConfig={{
						fileTypes: fileTypes,
						maxFileSize: permittedFileInfo?.config.image?.maxFileSize,
					}}
					error={error}
				/>
			)}

			<div className="flex justify-center gap-1">
				{files.map((file, index) => (
					<FilePreview
						key={file.name + index}
						file={file}
						isUploading={isUploading}
						removeFile={() =>
							setFiles(files.filter((someFile) => someFile !== file))
						}
					/>
				))}
			</div>
			{!isEmpty && (
				<Button
					className="w-full"
					data-ul-element="button"
					onClick={(event) => {
						event.preventDefault();
						startUpload(files);
					}}
					isLoading={isUploading}
				>
					<Upload className="mr-1" /> Upload
				</Button>
			)}
		</div>
	);
};

export default FieldFileUpload;
