import styled from "styled-components";

import { SkillBoardContentElement } from "../skillBoard/styles";

export const SkillBoardWrapper = styled.div`
	@media (min-width: 1000px) {
		grid-area: board;
	}
`;

export const SkillBoardBody = styled.div`
	width: 75%;
	max-width: 400px;
	margin: 0 auto;

	background: white;
	box-shadow: 1.8px 2.4px 21px 0 rgba(150, 150, 150, 0.58);

	${SkillBoardContentElement} {
		padding: 30px 25px;
		box-sizing: border-box;
	}

	@media (min-width: 1000px) {
		width: 80%;
		max-width: 800px;
	}
`;
