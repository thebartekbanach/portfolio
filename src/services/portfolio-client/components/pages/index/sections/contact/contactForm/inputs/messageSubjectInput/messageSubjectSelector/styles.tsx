import styled from "styled-components";

import { useFont } from "~/utils/useFont";

interface MessageSubjectSelectorProps {
	hasFocus: boolean;
}

export const MessageSubjectSelectorElement = styled.div<MessageSubjectSelectorProps>`
	position: relative;

	box-shadow: ${p => (p.hasFocus ? "rgba(94, 88, 248, 0.35)" : "rgba(205, 205, 205, 0.45)")} 0px
		9px 25px;
	transition: box-shadow 300ms;

	${useFont.nunitoSans.regular};
	color: #5d5d5d;

	// top shadow of expandable list hide
	&::after {
		content: "";

		display: block;
		position: absolute;
		z-index: 3;

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
	z-index: 4;

	top: 50%;
	right: 25px;
	width: 12px;
	height: 12px;

	transform: translateY(${p => (p.subjectSelectorOpenState ? -3 : -8)}px)
		rotateX(${p => (p.subjectSelectorOpenState ? 0 : 180)}deg) rotate(45deg);

	transition: transform 400ms;

	cursor: pointer;

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

interface CurrentElementProps {
	notSelectedError: boolean;
}

export const CurrentElement = styled.span<CurrentElementProps>`
	display: block;
	position: relative;

	padding: 20px 27px;
	padding-right: 60px;

	border: 3px solid white;
	border-color: ${p => (p.notSelectedError ? "#fa6767" : "white")};
	transition: border-color 300ms;

	${p => {
		console.log(p);
		return null;
	}};

	cursor: pointer; // open menu cursor
`;

interface AvailableElementsWrapperProps {
	isVisible: boolean;
}

export const AvailableElementsWrapper = styled.div<AvailableElementsWrapperProps>`
	position: absolute;
	z-index: 2;

	top: 100%;
	left: 0;
	width: 100%;

	background: white;

	box-shadow: ${p => (p.isVisible ? "rgba(94, 88, 248, 0.35)" : "rgba(205, 205, 205, 0.45)")} 0px
		3px 25px;
	transition: box-shadow 300ms;
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
