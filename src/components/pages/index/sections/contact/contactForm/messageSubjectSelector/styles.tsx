import styled from "styled-components";

import { useFont } from "~/utils/useFont";

export const MessageSubjectSelectorElement = styled.div`
	position: relative;

	box-shadow: 3.5px 4.9px 20.6px 0.4px rgba(94, 88, 248, 0.55);

	${useFont.nunitoSans.regular};
	color: #5d5d5d;

	// top shadow of expandable list hide
	&::after {
		content: "";

		display: block;
		position: absolute;
		z-index: 1;

		top: 0;
		left: 0;
		width: 100%;
		height: 100%;

		background: white;
	}
`;

interface StateArrowProps {
	subjectSelectorOpenState: boolean;
}

export const StateArrow = styled.div<StateArrowProps>`
	position: absolute;
	z-index: 2;

	top: 50%;
	right: 25px;
	width: 12px;
	height: 12px;

	transform: translateY(${p => (p.subjectSelectorOpenState ? -3 : -8)}px) rotate(45deg)
		rotateX(${p => (p.subjectSelectorOpenState ? 0 : 180)}deg)
		rotateY(${p => (p.subjectSelectorOpenState ? 0 : 180)}deg);

	transition: transform 400ms;

	&::before,
	&::after {
		content: "";
		position: absolute;
		display: block;
		background: #acacac;
	}

	&::before {
		width: 100%;
		height: 3px;
	}

	&::after {
		width: 3px;
		height: 100%;
	}
`;

export const CurrentElement = styled.span`
	display: block;
	position: relative;

	padding: 20px 30px;
	padding-right: 60px;

	z-index: 2;

	cursor: pointer; // open menu cursor
`;

export const AvailableElementsWrapper = styled.div`
	position: absolute;
	top: 100%;
	left: 0;
	width: 100%;

	background: white;
	box-shadow: 3.5px 4.9px 20.6px 0.4px rgba(94, 88, 248, 0.55);
`;

export const AvailableElementsList = styled.ul`
	margin: 0;
	padding-left: 0;
	padding-bottom: 10px;

	max-height: 200px;
	overflow: auto;

	list-style-type: none;
`;

export const AvailableElementsItem = styled.li`
	padding: 20px 30px;

	cursor: pointer;

	&:hover {
		background: #eeeeee;
	}
`;
