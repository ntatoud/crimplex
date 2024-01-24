import { motion, useAnimate } from "framer-motion";
import { Heart } from "lucide-react";
import { FC } from "react";
import { Button, ButtonProps } from "./ui/button";

interface LikeButtonProps extends ButtonProps {
	isLiked?: boolean;
	onLike: () => void;
	color?: string;
}

const TRANSITIONS_DURATION = 0.1;
const whileTapAnimation = {
	scale: 0.95,
	rotate: [0, 2, -2, 0],
	x: [0, 0.25, -0.25, 0],
	transition: { duration: TRANSITIONS_DURATION, repeat: Infinity },
};

const onTapAnimation = {
	scale: [1.3, 1],
	transition: { duration: TRANSITIONS_DURATION },
};
const LikeButton: FC<LikeButtonProps> = ({
	isLiked,
	onLike,
	color = "text-primary",
}) => {
	const [scope, animate] = useAnimate();

	return (
		<Button
			className={`${color} hover:scale-110 transition-all`}
			variant="link"
			size="icon"
			onClick={() => onLike()}
			key={String()}
		>
			<motion.span
				ref={scope}
				whileTap={whileTapAnimation}
				onTap={() => animate(scope.current, onTapAnimation)}
				transition={{ duration: TRANSITIONS_DURATION }}
			>
				{isLiked ? <Heart fill="currentColor" /> : <Heart />}
			</motion.span>
		</Button>
	);
};

export default LikeButton;
