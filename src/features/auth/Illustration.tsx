import Image from "next/image";

import illustration from "/public/illustration.jpg";

const Illustration = () => {
	return (
		<div className="hidden flex-1 relative object-cover md:flex">
			<Image
				src={illustration}
				alt="Mountain reflecting on a lake"
				className="object-cover"
				aria-roledescription="illustration"
				role="img"
				fill
			/>
			<span className="absolute bottom-0 left-0 text-xs">
				Photo by{" "}
				<a
					className="text-slate-200 underline"
					href="https://unsplash.com/fr/@matteocatanese?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
				>
					Matteo Catanese
				</a>{" "}
				on{" "}
				<a
					className="text-slate-200 underline"
					href="https://unsplash.com/fr/photos/kirkjufell-islande-4KrQq8Z6Y5c?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
				>
					Unsplash
				</a>
			</span>
		</div>
	);
};

export default Illustration;
