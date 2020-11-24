import styled, { css } from "styled-components";

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
	zIndex?: number;
}

export const CurrentChildrenWrapper = styled.div<CurrentChildrenWrapperProps>`
	${p =>
		p.zIndex === undefined
			? null
			: css`
					position: relative;
					z-index: ${p.zIndex};
			  `}

	opacity: ${p => (p.isContentVisible ? 1 : 0)};
	transition: opacity 300ms;
`;
