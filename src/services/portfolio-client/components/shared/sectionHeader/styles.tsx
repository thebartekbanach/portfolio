import styled from "styled-components";

import { useFont } from "~/utils/useFont";

export const SectionHeaderAndDescriptionWrapper = styled.header`
	text-align: center;
	margin-top: 160px;
`;

export const SectionHeaderElement = styled.h2`
	${useFont.montserrat.extraBold};
	font-size: 40px;
	color: #4764e6;
`;

export const SectionDescription = styled.span`
	display: inline-block;
	padding: 0 20px;

	${useFont.nunitoSans.regular};
	font-size: 17px;
	letter-spacing: 0.7px;
	line-height: 1.2em;
	color: #909090;

	@media (max-width: 400px) {
		br {
			display: none;
		}
	}
`;
