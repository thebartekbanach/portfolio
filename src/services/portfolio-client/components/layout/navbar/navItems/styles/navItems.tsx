import styled from "styled-components";

import { useFont } from "~/utils/useFont";

export const NavbarContent = styled.div`
	z-index: 100;
`;

export const NavbarItem = styled.a`
	${useFont.nunitoSans.bold};
	text-decoration: none;
	color: #242424;

	padding: 15px 30px;

	transition: color 200ms;

	&:hover {
		color: #4764e6;
	}
`;

export const NavbarContactButton = styled.a`
	display: inline-block;

	${useFont.nunitoSans.bold};
	text-decoration: none;
	color: white;

	padding: 15px 35px;
	background: #4764e6;
	border-radius: 40px;
	box-shadow: 1.5px 1.4px 8px 0 rgba(94, 88, 248, 0.46);

	margin-left: 25px;

	transition: transform 300ms, box-shadow 250ms;

	&:hover {
		transform: scale(0.95);
		box-shadow: 0px 0px 0px 0 #4764e6;
	}

	@media (max-width: 1050px) {
		margin-left: 0;
		margin-top: 20px;

		font-size: 0.8em;
	}
`;

interface NavbarItemsProps {
	isMobileMenuOpen?: boolean;
}

export const NavbarItems = styled.div<NavbarItemsProps>`
	@media (max-width: 1050px) {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		position: absolute;
		bottom: 100%;
		left: 0;
		width: 100%;
		height: 100vh;

		background: white;
		box-shadow: 0px -35px 46px 18px rgba(153, 153, 153, 0.39);

		transition: transform 500ms, opacity 300ms ${p => (p.isMobileMenuOpen ? 200 : 0)}ms;
		transform: translateY(${p => (p.isMobileMenuOpen ? "100%" : "-30px")});

		font-size: 1.4em;

		${NavbarItem} {
			opacity: ${p => (p.isMobileMenuOpen ? 1 : 0)};
			transition: opacity 200ms ${p => (p.isMobileMenuOpen ? 400 : 0)}ms, color 200ms;
		}

		${NavbarContactButton} {
			opacity: ${p => (p.isMobileMenuOpen ? 1 : 0)};
			transition: opacity 200ms ${p => (p.isMobileMenuOpen ? 400 : 0)}ms, transform 300ms,
				box-shadow 250ms;
		}
	}
`;
