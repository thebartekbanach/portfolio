import styled from "styled-components";
import { useFont } from "~/utils/styles/fonts";

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
		color: #4764e6;

		@supports (-webkit-text-fill-color: transparent) and
			((-webkit-background-clip: text) or (background-clip: text)) {
			background: linear-gradient(to top, #4764e6, #694fff);
			-webkit-text-fill-color: transparent;
			-webkit-background-clip: text;
			background-clip: text;
		}
	}
`;
