import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
	AnimationPlaybackControls,
	MotionProps,
	motion,
	useAnimate,
} from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";

export interface FilePreviewProps extends MotionProps {
	file: File;
	removeFile: () => void;
	isUploading: boolean;
}
export const FilePreview = ({
	file,
	removeFile,
	isUploading,
	...props
}: FilePreviewProps) => {
	const [scope, animate] = useAnimate();

	const appearAnimation = {
		scale: [0, 1],
		opacity: [0, 1],
		transition: { duration: 0.1 },
	};
	const removeAnimation = () =>
		animate(scope.current, {
			scale: [1, 0],
			opacity: [1, 0],
			transition: { duration: 0.1 },
		});

	return (
		<motion.div
			className={cn(
				"relative group overflow-hidden object-cover aspect-square h-40 border border-input rounded-lg ",
				isUploading ? "opacity-50 cursor-not-allowed" : "",
			)}
			ref={scope}
			animate={appearAnimation}
			{...props}
		>
			<Image
				src={URL.createObjectURL(file)}
				alt="New profile preview"
				className="object-cover group-hover:opacity-80 group-hover:brightness-50 transition-all duration-300 "
				fill
			/>

			<RemovePreviewButton
				removeFile={removeFile}
				removeAnimation={removeAnimation}
				isUploading={isUploading}
			/>
		</motion.div>
	);
};

const RemovePreviewButton = ({
	removeFile,
	isUploading,
	removeAnimation,
}: {
	removeFile: () => void;
	isUploading: boolean;
	removeAnimation: () => AnimationPlaybackControls;
}) => {
	if (isUploading) return;
	return (
		<Button
			variant="link"
			className="absolute text-red-500 drop-shadow-sm -right-2 top-0 invisible group-hover:visible"
			onClick={() => {
				setTimeout(() => {
					// Only cause this is a single file upload field
					removeAnimation();
					removeFile();
				}, 200);
			}}
		>
			<X className="h-6 w-6" />
		</Button>
	);
};
