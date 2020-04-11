import styled from "styled-components";

export const NavItem = styled.li`
	display: inline-block;

	a {
		display: block;
		padding: 20px;
		text-decoration: none;
		color: #242424;

		transition: color 200ms, transform 200ms;

		&:hover {
			color: #4764e6;
		}

		&:active {
			transform: scale(0.98);
		}
	}

	@media (max-width: 1000px) {
		display: block;
		width: 100%;
		text-align: center;
	}
`;

export const NavItems = styled.ul<NavItemsProps>`
	list-style: none;
	padding: 0;
	margin: 0;

	@media (max-width: 1000px) {
		position: absolute;
		top: 0;
		left: calc(100% + 100px);
		width: 100vw;
		height: 100vh;

		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;

		background: white;
		transition: transform 300ms ease-in-out;
		transition-delay: ${p => (p.isShownOnMobile ? 0 : 450)}ms;
		transform: ${p => (p.isShownOnMobile ? "translateX(calc(-100% - 100px))" : "none")};

		&::before {
			content: "";
			position: absolute;
			left: -100px;
			top: 0;
			width: 100px;
			height: 100%;
			background: linear-gradient(to right, transparent, white);
		}
	}

	@media (max-width: 500px) {
		padding-top: 30px;
	}
`;

interface NavItemsProps {
	isShownOnMobile: boolean;
}

export const NavItemsWrapper = styled.nav<NavItemsProps>`
	height: 100%;
	align-self: stretch;
	display: inline-flex;
	align-items: center;

	@media (max-width: 1000px) {
		position: absolute;
		display: block;
		left: 0;
		top: 0;
		width: 100%;
		height: 100vh;
		overflow: hidden;
		z-index: ${p => (p.isShownOnMobile ? 1 : -1)};
		transition: z-index ${p => (p.isShownOnMobile ? 0 : 4000)}ms;

		${NavItem} {
			transform: translateX(${p => (p.isShownOnMobile ? 0 : 100)}%);
			opacity: ${p => (p.isShownOnMobile ? 1 : 0)};
			transition: transform 300ms, opacity 300ms;

			&:nth-child(1) {
				transition-delay: 100ms;
			}

			&:nth-child(2) {
				transition-delay: 200ms;
			}

			&:nth-child(3) {
				transition-delay: 300ms;
			}

			&:nth-child(4) {
				transition-delay: 400ms;
			}
		}
	}
`;
