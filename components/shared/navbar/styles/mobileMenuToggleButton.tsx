import styled from "styled-components";

interface MobileMenuToggleButtonProps {
	mobileMenuState: boolean;
}

export const MobileMenuToggleButtonIcon = styled.div<MobileMenuToggleButtonProps>`
	display: block;
	position: absolute;
	top: 50%;
	left: 50%;
	width: ${p => (p.mobileMenuState ? 48 : 40)}%;
	transform: translate(-50%, -50%);

	background: ${p => (p.mobileMenuState ? "transparent" : "#4763e8")};

	height: 6px;
	border-radius: 2px;

	transition: width 100ms, height 100ms, background 100ms;

	&::before,
	&::after {
		content: "";
		display: block;
		position: absolute;
		left: 0;
		width: 100%;
		height: 6px;
		border-radius: 2px;
		background: #4763e8;
		transition: top 100ms ease-in-out, bottom 100ms ease-in-out, height 100ms ease-in-out,
			left 100ms ease-in-out, transform 300ms;
	}

	&::before {
		top: 9px;
		transform: translateY(${p => (p.mobileMenuState ? -9 : 0)}px)
			rotate(${p => (p.mobileMenuState ? 45 : 0)}deg);
	}

	&::after {
		bottom: 9px;
		transform: translateY(${p => (p.mobileMenuState ? 9 : 0)}px)
			rotate(${p => (p.mobileMenuState ? -45 : 0)}deg);
	}

	@media (max-width: 599px) {
		&::before,
		&::after,
		& {
			height: 5px;
		}

		&::before {
			top: 7px;
			transform: translateY(${p => (p.mobileMenuState ? -7 : 0)}px)
				rotate(${p => (p.mobileMenuState ? 45 : 0)}deg);
		}

		&::after {
			bottom: 7px;
			transform: translateY(${p => (p.mobileMenuState ? 7 : 0)}px)
				rotate(${p => (p.mobileMenuState ? -45 : 0)}deg);
		}
	}
`;

function hoverAnimationOnClosedMenu({ mobileMenuState }: MobileMenuToggleButtonProps) {
	return mobileMenuState
		? ""
		: `${MobileMenuToggleButtonIcon} {
			&::before {
				left: 5px;
			}

			&::after {
				left: -5px;
			}
		}`;
}

function hoverAnimationOnOpenMenu({ mobileMenuState }: MobileMenuToggleButtonProps) {
	return !mobileMenuState
		? ""
		: `${MobileMenuToggleButtonIcon} {
			height: 7px;
			width: 56%;

			&::before {
				height: 7px;
			}

			&::after {
				height: 7px;
			}
			
			@media (max-width: 599px) {
				height: 6px;

				&::before {
					height: 6px;
				}
	
				&::after {
					height: 6px;
				}
			}
		}
	`;
}

export const MobileMenuToggleButton = styled.button<MobileMenuToggleButtonProps>`
	@media (min-width: 1001px) {
		display: none;
	}

	display: inline-block;
	position: relative;
	width: 50px;
	height: 50px;
	border-radius: 8px;
	background: #f5e7fe;
	border: none;
	cursor: pointer;
	z-index: 2;
	outline: none;

	transition: transform 200ms;

	-webkit-tap-highlight-color: transparent;

	@media (any-pointer: coarse) or (any-pointer: fine) {
		&:hover {
			${hoverAnimationOnClosedMenu}
			${hoverAnimationOnOpenMenu}
		}
	}

	&:active {
		transform: scale(0.9);
	}

	@media (min-width: 600px) {
		width: 60px;
		height: 60px;
	}
`;
