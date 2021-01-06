import styled from "styled-components";

import { useFont } from "~/utils/useFont";

export const MobileWelcomeSectionWrapper = styled.div`
	position: absolute;

	top: 50%;
	left: 50%;
	width: 100%;

	transform: translate(-50%, -60%);

	@media (min-width: 750px) {
		display: none;
	}
`;

export const HelloTextWrapper = styled.div`
	${useFont.montserrat.bold};
`;

export const MyNameWrapper = styled.div`
	${useFont.montserrat.extraBold};
`;

export const AboutMeTextWrapper = styled.p`
	margin-top: 30px;
	padding: 0 10px;

	${useFont.nunitoSans.regular};
	line-height: 1.4em;
	text-align: center;
`;

export const FindOutMoreButtonWrapper = styled.div`
	margin-top: 50px;
	text-align: center;
`;

export const FindOutMoreButton = styled.a`
	display: inline-block;

	padding: 20px 50px;

	background: #5f55f7;
	border-radius: 5px;

	${useFont.nunitoSans.regular};
	text-decoration: none;
	color: white;
`;
