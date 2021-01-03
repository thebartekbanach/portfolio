import { CSSProperties, FC } from "react";

import { useWidthAnimation } from "./hooks";

interface AnimateWidthProps {
	duration: number;
	width: number | "auto";
	onAnimationEnd?: () => void;
}

export const AnimateWidth: FC<AnimateWidthProps> = ({
	duration,
	width,
	onAnimationEnd,
	children
}) => {
	const [currentWidth, wrapperRef, childrenRef] = useWidthAnimation(
		width,
		duration,
		onAnimationEnd
	);

	const wrapperStyles: CSSProperties = {
		transition: `${duration}ms`,
		width: typeof currentWidth === "number" ? `${currentWidth}px` : currentWidth,
		overflow: "hidden"
	};

	return (
		<div ref={wrapperRef} style={wrapperStyles}>
			<div ref={childrenRef} style={{ display: "inline-block", position: "relative" }}>
				{children}
			</div>
		</div>
	);
};
