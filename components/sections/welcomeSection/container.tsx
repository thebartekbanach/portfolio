import styled from "styled-components";

export const WelcomeSectionContentContainer = styled.div`
	min-height: calc(100vh - 150px);
`;

export const WelcomeSectionContent = styled.div`
	position: relative;
	width: 82%;
	min-height: 600px;
	margin: auto;

	@media (max-width: 950px) {
		width: 85%;
	}
`;
