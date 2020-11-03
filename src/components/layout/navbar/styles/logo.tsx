import styled from "styled-components";
import { useFont } from "~/utils/useFont";

export const NavbarLogoContainer = styled.a`
	${useFont.nunitoSans.semiBold};
	font-size: 17.5px;
	text-decoration: none;

	padding: 15px 15px 15px 0;

	z-index: 2;

	&:hover {
		text-decoration: underline;
		text-underline-offset: 3px;
		text-decoration-color: #898989;
	}
`;

export const NavbarLogoDevPart = styled.span`
	color: #a163aa;
`;

export const NavbarLogoUserNamePart = styled.span`
	color: #898989;
`;

export const NavbarLogoSubPagePart = styled.span``;
