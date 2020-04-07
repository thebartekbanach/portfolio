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

	transition: left 300ms ease-in-out;

	@media (max-width: 1000px) {
		position: absolute;
		left: ${p => (p.isShownOnMobile ? 0 : 100)}%;
		width: 100vw;
		height: 100vh;

		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;

		background: wheat;
		transition-delay: ${p => (p.isShownOnMobile ? 0 : 450)}ms;
	}

	@media (max-width: 500px) {
		padding-top: 30px;
	}
`;

interface NavItemsProps {
	isShownOnMobile: boolean;
}

export const NavItemsWrapper = styled.nav<NavItemsProps>`
	align-self: stretch;

	@media (max-width: 1000px) {
		position: absolute;
		left: 0;
		top: 0;
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		z-index: ${p => (p.isShownOnMobile ? 1 : -1)};

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
