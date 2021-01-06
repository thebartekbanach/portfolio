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

	box-shadow: 1.5px 1.4px 8px 0 rgba(94, 88, 248, 0.46);
	background: #5f55f7;
	border-radius: 5px;

	transition: transform 300ms, box-shadow 250ms;

	${useFont.nunitoSans.bold};
	letter-spacing: 1px;
	text-decoration: none;
	color: white;

	&:hover {
		transform: scale(0.95);
		box-shadow: 0px 0px 0px 0 rgba(94, 88, 248, 0.46);
	}
`;
