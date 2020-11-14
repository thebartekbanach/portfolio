import styled from "styled-components";

import { useFont } from "~/utils/useFont";

interface SkillTileElementProps {
	isSelected: boolean;
	elementIndex: number;
}

export const SkillTileElement = styled.div<SkillTileElementProps>`
	position: relative;
	max-width: 80%;

	margin: 0 auto;
	margin-top: 80px;

	box-sizing: border-box;

	box-shadow: 1.8px 2.4px 21px 0
		${p => (p.isSelected ? "rgba(105, 79, 255, 0.4)" : "rgba(150, 150, 150, 0.6)")};

	transition: box-shadow 500ms ${p => (p.isSelected ? 1000 : 0)}ms;

	z-index: 1;

	overflow: hidden;

	cursor: ${p => (p.isSelected ? "default" : "pointer")};

	@media (min-width: 1000px) {
		grid-area: tile-${p => p.elementIndex};
		max-width: 100%;
		width: 100%;
	}
`;

export const SkillTileElementContent = styled.div`
	position: relative;

	padding: 50px 30px;
	padding-bottom: 100px;

	z-index: 1;

	background: white;

	border-width: 2px;
	border-style: solid;
	border-image-source: linear-gradient(to bottom, #694fff, #4764e6);
	border-image-slice: 1;
`;

export const SkillTileIconWrapper = styled.div`
	position: relative;

	width: 50px;
	height: 50px;

	margin: 0 auto;
	overflow: hidden;

	svg {
		position: absolute;
		top: 50%;
		left: 0;
		width: 100%;
		transform: translateY(-50%);
	}

	&::after {
		content: "";
		display: block;
		padding-bottom: 100%;
	}
`;

export const SkillTileTitle = styled.h3`
	${useFont.nunitoSans.extraBold};
	text-align: center;
	letter-spacing: 1px;
	color: #25233b;
`;

export const SkillTileDescription = styled.div`
	max-width: 280px;
	margin: 0 auto;

	${useFont.nunitoSans.regular};
	text-align: center;
	letter-spacing: 0.5px;
	line-height: 1.3em;
	color: #545454;
`;

interface SkillTileArrowProps {
	isSelected: boolean;
}

export const SkillTileArrow = styled.div<SkillTileArrowProps>`
	position: absolute;
	bottom: 40px;
	left: calc(50% - 15px);

	margin: 0 auto;
	margin-top: 30px;

	width: 30px;
	height: 30px;

	transform: rotateX(${p => (p.isSelected ? "0deg" : "180deg")});
	transition: transform 300ms;

	svg {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;

		transition: opacity 150ms 150ms;

		&.normal {
			opacity: ${p => (p.isSelected ? 0 : 1)};
		}

		&.selected {
			opacity: ${p => (p.isSelected ? 1 : 0)};
		}
	}
`;
