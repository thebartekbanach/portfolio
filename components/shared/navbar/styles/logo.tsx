import styled from "styled-components";
import { useFont } from "~/utils/styles/fonts";

export const DirectoryName = styled.span`
	color: #ad58f8;
`;

export const UserName = styled.span`
	color: #5e58f8;
`;

export const LogoElement = styled.span`
	${useFont.nunitoSans.semiBold};
	font-size: 20px;
	letter-spacing: 0.6px;

	@media (max-width: 800px) {
		font-size: 18px;
	}
`;

export const LogoWrapper = styled.div`
	z-index: 10000;
`;
