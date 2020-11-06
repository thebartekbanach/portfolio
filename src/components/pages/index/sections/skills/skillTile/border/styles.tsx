import styled, { css } from "styled-components";

export enum AnimationStartPoint {
	LEFT = 0,
	CENTER = 1,
	RIGHT = 2
}

interface BorderSvgElementProps {
	horizontalPathLength: number;
	verticalPathLength: number;

	isBorderVisible: boolean;
	animationStartPoint: AnimationStartPoint;
}

const leftRightBorderAnimation = css<BorderSvgElementProps>`
	transform: rotateY(${p => (p.animationStartPoint === AnimationStartPoint.LEFT ? 0 : 180)}deg);

	line {
		&.top,
		&.bottom {
			stroke-dasharray: ${p => p.horizontalPathLength} ${p => p.horizontalPathLength};
			stroke-dashoffset: ${p => (p.isBorderVisible ? p.horizontalPathLength : 0)};
		}

		&.left,
		&.right {
			stroke-dasharray: ${p => p.verticalPathLength} ${p => p.verticalPathLength};
			stroke-dashoffset: ${p => (p.isBorderVisible ? p.verticalPathLength : 0)};
		}

		&.top,
		&.left {
			transition: stroke-dashoffset 500ms;
			transition-delay: ${p => (p.isBorderVisible ? "0s" : "500ms")};
		}

		&.right,
		&.bottom {
			transition: stroke-dashoffset 500ms;
			transition-delay: ${p => (p.isBorderVisible ? "500ms" : "0s")};
		}
	}
`;

const centerBorderAnimation = css<BorderSvgElementProps>`
	line {
		transition: stroke-dasharray 333ms, stroke-dashoffset 333ms;

		&.top {
			stroke-dasharray: ${p =>
				`${p.horizontalPathLength} ${p.isBorderVisible ? p.horizontalPathLength : 0}`};
			stroke-dashoffset: ${p =>
				p.isBorderVisible ? p.horizontalPathLength : p.horizontalPathLength / 2};

			transition-delay: ${p => (p.isBorderVisible ? 0 : 666)}ms;
		}

		&.bottom {
			stroke-dasharray: ${p =>
				`${p.isBorderVisible ? 0 : p.horizontalPathLength} ${p.horizontalPathLength}`};
			stroke-dashoffset: -${p => (p.isBorderVisible ? p.horizontalPathLength / 2 : 0)};

			transition-delay: ${p => (p.isBorderVisible ? 666 : 0)}ms;
		}

		&.left,
		&.right {
			stroke-dasharray: ${p => p.verticalPathLength} ${p => p.verticalPathLength};
			stroke-dashoffset: ${p => (p.isBorderVisible ? p.verticalPathLength : 0)};

			transition-delay: 333ms;
		}
	}
`;

export const BorderSvgElement = styled.svg<BorderSvgElementProps>`
	${p =>
		p.animationStartPoint === AnimationStartPoint.CENTER
			? p.horizontalPathLength !== 0 && p.verticalPathLength !== 0
				? centerBorderAnimation
				: null // fix of artifacts of this animation directly after page reload
			: leftRightBorderAnimation};
`;
