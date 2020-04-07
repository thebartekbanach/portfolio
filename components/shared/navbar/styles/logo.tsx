import styled from "styled-components";
import { fonts } from "~/utils/styles/fonts";

export const DirectoryName = styled.span`
	color: #a163aa;
`;

export const UserName = styled.span`
	color: #898989;
`;

export const LogoElement = styled.span`
	font-size: 20px;
	font-family: ${fonts.nunitoSans};
	font-weight: bold;
	letter-spacing: 0.6px;
`;

export const LogoWrapper = styled.div`
	z-index: 10000;
`;
