import styled from "styled-components";

export const RealizationsSectionElement = styled.section`
	position: relative;
`;

export const RealizationsList = styled.div`
	margin: 60px auto;
	width: 80%;
	max-width: 350px;

	@media (min-width: 1000px) {
		max-width: 1000px;
	}
`;

export const RealizationsSectionBackground = styled.div`
	position: absolute;
	height: calc(100% + 500px);

	z-index: -3;

	svg {
		width: 100%;
		height: 100%;
	}

	@media (max-width: 999px) {
		display: none;
	}

	@media (min-width: 1000px) {
		width: 220%;
		left: -50%;
		top: -500px;
	}

	@media (min-width: 1150px) {
		top: -400px;
		left: -25%;
		width: 150%;
	}
`;
