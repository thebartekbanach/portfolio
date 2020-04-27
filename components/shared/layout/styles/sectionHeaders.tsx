import styled from "styled-components";
import { useFont } from "~/utils/styles/fonts";

export const SectionHeader = styled.h1`
	${useFont.montserrat.extraBold};
	margin-bottom: 30px;

	font-size: 40px;
	color: #4764e6;

	@media (max-width: 600px) {
		font-size: 30px;
	}
`;

export const SectionDescription = styled.h2`
	${useFont.nunitoSans.regular};
	font-size: 18px;
	color: #999;

	@media (max-width: 600px) {
		font-size: 16px;
	}
`;

export const SectionHeadersContainer = styled.header`
	margin-bottom: 100px;

	${SectionHeader}, ${SectionDescription}, & {
		display: block;
		width: 100%;
		text-align: center;
	}
`;
