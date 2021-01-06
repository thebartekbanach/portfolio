import styled from "styled-components";

export const WelcomeSectionWrapper = styled.section`
	position: relative;
	min-height: calc(100vh - 100px);
	max-width: calc(100% - 55px);
	margin: 0 auto;

	@media (min-width: 450px) {
		max-width: 395px;
	}

	@media (min-width: 750px) {
		width: calc(100% - 55px);
		max-width: 1600px;
	}
`;
