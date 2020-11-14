import styled from "styled-components";

interface ElementBorderHideProps {
	isHiderVisible: boolean;
}

export const CenterElementBorderHide = styled.div<ElementBorderHideProps>`
	z-index: 2;

	&,
	div {
		position: absolute;
		top: -2px;
		left: -2px;
		width: calc(100% + 3px);
		height: calc(100% + 3px);
		box-sizing: border-box;
	}

	div {
		border: 8px solid transparent;
		transition: transform 333ms;
	}

	div:nth-child(1),
	div:nth-child(2) {
		border-top-color: white;
		width: 55%;

		transition-delay: ${p => (p.isHiderVisible ? 666 : 0)}ms;

		transform: scaleX(${p => (p.isHiderVisible ? 1 : 0)});
		transform-origin: left center;
	}

	div:nth-child(2) {
		right: 0;
		left: auto;

		transform-origin: right center;
	}

	div:nth-child(3) {
		top: -4px;
		left: -2px;
		height: calc(100% + 8px);
		width: 101%;

		transform-origin: bottom center;
		transform: scaleY(${p => (p.isHiderVisible ? 1 : 0)});

		transition-delay: 333ms;

		border-left-color: white;
		border-right-color: white;

		border-left-width: 12px;
		border-right-width: 12px;
	}

	div:nth-child(4) {
		transform: scaleX(${p => (p.isHiderVisible ? 1 : 0)});
		transform-origin: center center;

		transition-delay: ${p => (p.isHiderVisible ? 0 : 666)}ms;

		border-bottom-color: white;
	}
`;

interface SideElementBorderHideProps extends ElementBorderHideProps {
	animationStartPosition: "left" | "right";
}

export const SideElementBorderHide = styled.div<SideElementBorderHideProps>`
	z-index: 2;

	transform: rotateY(${p => (p.animationStartPosition === "left" ? 0 : 180)}deg);

	&,
	div {
		position: absolute;

		top: -4px;
		left: -4px;
		width: calc(100% + 9px);
		height: calc(100% + 9px);

		border: 8px solid transparent;
		box-sizing: border-box;

		transition: transform 500ms;
	}

	/* Top border hider */
	div:nth-child(1) {
		border-top-color: white;
	}

	/* Top and bottom border hiders show / hide transform */
	div:nth-child(1),
	div:nth-child(4) {
		transform: scaleX(${p => (p.isHiderVisible ? 1 : 0)});
		transform-origin: center right;
	}

	/* Left border hider */
	div:nth-child(2) {
		border-left-color: white;
	}

	/* Top and left border hiders are animated first, when showing border */
	div:nth-child(1),
	div:nth-child(2) {
		transition-delay: ${p => (p.isHiderVisible ? 500 : 0)}ms;
	}

	/* Right border hider */
	div:nth-child(3) {
		border-right-color: white;
	}

	/* Fix of leaking pixels at corners, show / hide transform */
	div:nth-child(2),
	div:nth-child(3) {
		top: -6px;
		height: calc(100% + 12px);

		transform: scaleY(${p => (p.isHiderVisible ? 1 : 0)});
		transform-origin: center bottom;
	}

	/* Bottom border hider */
	div:nth-child(4) {
		border-bottom-color: white;
	}

	/* Transition delay for right and bottom borders, they are animated last when showing the border */
	div:nth-child(3),
	div:nth-child(4) {
		transition-delay: ${p => (p.isHiderVisible ? 0 : 500)}ms;
	}
`;
