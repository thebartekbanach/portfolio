import styled from "styled-components";
import { useFont } from "~/utils/styles/fonts";
import { textGradient } from "~/utils/styles/textGradient";

export const AboutMeContainer = styled.div`
	max-width: 40%;

	${useFont.nunitoSans.regular}
	font-size: 18px;
	color: #5a5f69;

	line-height: 1.4em;
	letter-spacing: 0.02em;

	@media (max-width: 1000px) {
		max-width: 45%;
	}

	@media (max-width: 800px) {
		max-width: 100%;
		margin-top: 50px;
	}

	b {
		${textGradient("to top", "#4764e6", "#694fff", "#4764e6")}
	}
`;
