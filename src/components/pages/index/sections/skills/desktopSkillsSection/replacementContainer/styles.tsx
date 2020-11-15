import styled from "styled-components";

export const NextChildrenAbsoluteWrapper = styled.div`
	position: absolute;

	top: 0;
	left: 0;
	width: 100%;
	height: auto;

	opacity: 0;
`;

interface CurrentChildrenWrapperProps {
	isContentVisible: boolean;
}

export const CurrentChildrenWrapper = styled.div<CurrentChildrenWrapperProps>`
	opacity: ${p => (p.isContentVisible ? 1 : 0)};
	transition: opacity 300ms;
`;
