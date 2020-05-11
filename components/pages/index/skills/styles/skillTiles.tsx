import styled from "styled-components";
import { useFont } from "~/utils/styles/fonts";
import { SkillsGridAreaNames } from "./skillGrid";

export const SkillTileIconWrapper = styled.div`
	margin-top: 50px;
	margin-bottom: 25px;

	svg {
		display: block;
		margin: auto;
		max-width: 55px;
		max-height: 55px;
	}
`;

export const SkillTileItemTitle = styled.div`
	width: 100%;

	${useFont.nunitoSans.bold};
	text-align: center;
	color: #25233b;
	font-size: 18.5px;
	letter-spacing: 0.74px;
`;

export const SkillTileItemDescription = styled.div`
	width: 100%;
	padding: 30px;
	padding-top: 22px;
	padding-bottom: 35px;
	box-sizing: border-box;

	${useFont.nunitoSans.regular};
	text-align: center;
	line-height: 1.38em;
	color: #545454;
`;

interface SkillTileItemStatePointerProps {
	isSelected: boolean;
}

export const SkillTileItemStatePointer = styled.div<SkillTileItemStatePointerProps>`
	position: absolute;
	bottom: 35px;
	left: 50%;
	width: 30px;
	height: 30px;
	transition: transform 300ms;
	transform: translateX(-50%) rotateX(${p => (p.isSelected ? 0 : 180)}deg);
`;

export const SkillTileItemStatePointerIconWrapper = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;

	opacity: 1;
	transition: opacity 500ms;

	&.exit-active,
	&.exit-done {
		opacity: 0;
	}

	svg {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
`;

const showBorderIfSelected = (p: SkillTileItemStatePointerProps) => {
	return !p.isSelected
		? ""
		: `
			&::before,
			&::after {
				top: auto;
				left: auto;
				right: 0px;
				bottom: 0px;
				width: 0px;
				height: 0px;
				border-width: 0px;
			}

			&::before {
				transition: width 250ms, height 250ms 250ms, border-width 50ms 500ms;
			}

			&::after {
				transition: width 250ms 250ms, height 250ms, border-width 50ms 500ms;
			}
	`;
};

export const SkillTileItemContent = styled.div`
	position: relative;
	width: 100%;
	height: 100%;
	padding-bottom: 60px;
	box-sizing: border-box;

	border: 2px solid transparent;
	border-image-source: linear-gradient(to top, #4764e6, #694fff);
	border-image-slice: 1;
`;

interface SkillTileItemProps {
	isSelected: boolean;
	tileAreaName: SkillsGridAreaNames;
}

export const SkillTileItem = styled.div<SkillTileItemProps>`
	grid-area: ${p => p.tileAreaName};
	position: relative;
	box-shadow: 1.8px 2.4px 21px 0 rgba(150, 150, 150, 0.58);
	overflow: hidden;

	cursor: ${p => (p.isSelected ? "auto" : "pointer")};

	-webkit-tap-highlight-color: transparent;

	@media (max-width: 900px) {
		max-width: 500px;
		margin: auto;
	}

	&::before,
	&::after {
		content: "";
		position: absolute;
		top: 0px;
		left: 0px;
		width: calc(100% + 1px);
		height: calc(100% + 1px);
		z-index: 2;

		border: 3px solid white;
		box-sizing: border-box;
	}

	&::before {
		border-bottom-color: transparent;
		border-left-color: transparent;
		left: -1px;

		transition: width 250ms, height 250ms 250ms;
	}

	&::after {
		border-top-color: transparent;
		border-right-color: transparent;
		top: -1px;

		transition: height 250ms, width 250ms 250ms;
	}

	${showBorderIfSelected};

	&:hover {
		${SkillTileItemStatePointer} {
			transform: translateX(-50%) rotateX(${p => (p.isSelected ? 0 : 180)}deg)
				translateY(${p => (p.isSelected ? 0 : 5)}px);
		}
	}
`;
