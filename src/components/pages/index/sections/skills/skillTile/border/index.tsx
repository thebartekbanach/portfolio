import { FC } from "react";
import { usePathLength } from "./hooks";
import { AnimationStartPoint, BorderSvgElement } from "./styles";

interface BorderProps {
	isVisible: boolean;
	animationStartPoint: AnimationStartPoint;
}

export const Border: FC<BorderProps> = ({ isVisible, animationStartPoint }) => {
	const [horizontalBorderRef, horizontalPathLength] = usePathLength();
	const [verticalBorderRef, verticalPathLength] = usePathLength();

	return (
		<BorderSvgElement
			className="border"
			width="100%"
			height="100%"
			isBorderVisible={isVisible}
			animationStartPoint={animationStartPoint}
			horizontalPathLength={horizontalPathLength}
			verticalPathLength={verticalPathLength}
		>
			<line
				ref={horizontalBorderRef}
				className="top"
				x1="100%"
				x2="0"
				y1="0"
				y2="0"
				strokeWidth="12"
				stroke="white"
			/>
			<line
				ref={verticalBorderRef}
				className="left"
				x1="0"
				x2="0"
				y1="100%"
				y2="0"
				strokeWidth="12"
				stroke="white"
			/>
			<line
				className="right"
				x1="100%"
				x2="100%"
				y1="100%"
				y2="0"
				strokeWidth="12"
				stroke="white"
			/>
			<line
				className="bottom"
				x1="100%"
				x2="0"
				y1="100%"
				y2="100%"
				strokeWidth="12"
				stroke="white"
			/>
		</BorderSvgElement>
	);
};
