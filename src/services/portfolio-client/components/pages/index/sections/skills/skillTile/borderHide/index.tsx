import { FC } from "react";

import { CenterElementBorderHide, SideElementBorderHide } from "./styles";

export enum AnimationStartPoint {
	LEFT = 0,
	CENTER = 1,
	RIGHT = 2
}

interface BorderProps {
	isVisible: boolean;
	startPoint: AnimationStartPoint;
}

// TODO: rename border to borderHide

export const BorderHide: FC<BorderProps> = ({ isVisible, startPoint }) => {
	if (startPoint === AnimationStartPoint.CENTER) {
		return (
			<CenterElementBorderHide isHiderVisible={isVisible}>
				<div /> {/* Top border */}
				<div /> {/* Left & right border */}
				<div /> {/* Bottom left border */}
				<div /> {/* Bottom right border */}
			</CenterElementBorderHide>
		);
	}

	return (
		<SideElementBorderHide
			isHiderVisible={isVisible}
			animationStartPosition={startPoint === AnimationStartPoint.LEFT ? "left" : "right"}
		>
			<div /> {/* Top border */}
			<div /> {/* Left border */}
			<div /> {/* Right border */}
			<div /> {/* Bottom border */}
		</SideElementBorderHide>
	);
};
