import styled from "styled-components";

export const SkillsSectionElement = styled.section`
	@media (min-width: 600px) {
		max-width: 600px;
		margin: 0 auto;
	}

	@media (min-width: 1000px) {
		max-width: none;
	}
`;

export const SkillsSectionGrid = styled.div`
	@media (min-width: 1000px) {
		display: grid;

		width: calc(100% - 60px);
		margin: 0 auto;

		grid-template-columns: 1fr 1fr 1fr;
		grid-column-gap: 30px;
		grid-row-gap: 60px;

		grid-template-areas:
			"tile-0 tile-1 tile-2"
			"board board board";
	}

	@media (min-width: 1100px) {
		max-width: 1100px;
	}
`;
