import styled from "styled-components";

import { useFont } from "~/utils/useFont";

export const NavbarLogoContainer = styled.a`
	${useFont.nunitoSans.semiBold};
	font-size: 17.5px;
	text-decoration: none;

	padding: 15px 15px 15px 0;

	z-index: 101;

	&:hover {
		text-decoration: underline;
		text-underline-offset: 3px;
		text-decoration-color: #898989;
	}
`;

export const NavbarLogoDevPart = styled.span`
	color: #a163aa;
	letter-spacing: 0.7px;
`;

export const NavbarLogoUserNamePart = styled.span`
	color: #5f55f7;
	letter-spacing: 0.7px;
`;

export const NavbarLogoSubPagePart = styled.span``;
