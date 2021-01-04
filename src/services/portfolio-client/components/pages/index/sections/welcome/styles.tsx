import styled from "styled-components";

import { useFont } from "~/utils/useFont";

export const WelcomeSectionWrapper = styled.section`
	max-width: calc(100% - 55px);
	margin: 0 auto;

	@media (min-width: 450px) {
		max-width: 395px;
	}

	@media (min-width: 750px) {
		position: relative;

		width: calc(100% - 55px);
		max-width: 1600px;
		min-height: calc(100vh - 100px);
	}
`;

export const WelcomeSectionContentWrapper = styled.div`
	@media (min-width: 750px) {
		position: absolute;
		display: grid;

		top: 50%;
		left: 50%;
		width: 100%;

		transform: translate(-50%, -60%);

		grid-template-columns: 20fr 15fr;
		grid-template-areas:
			"headers ."
			"aboutMe .";
	}

	@media (min-width: 1000px) {
		width: 90%;
		grid-template-columns: 1fr 1.3fr;
	}
`;

export const HeadersWrapper = styled.div`
	grid-area: headers;
`;

export const MainHeader = styled.h1`
	${useFont.nunitoSans.extraBold};
`;

export const Profession = styled.h2`
	${useFont.nunitoSans.semiBold};
	fill: #4764e6;
`;

export const DeveloperPictureWrapper = styled.div`
	display: block;
	height: 100%;
	padding-top: 20px;
	padding-bottom: 35px;

	@media (min-width: 750px) {
		position: absolute;
		top: 50%;
		left: 60%;
		width: 40%;

		transform: translateY(-50%);

		svg {
			display: block;
			position: absolute;
			top: 50%;
			left: 0;
			width: 100%;
			max-height: 130%;
			object-fit: cover;

			transform: translateY(-40%);
		}
	}

	@media (min-width: 1000px) {
		left: 50%;
		width: 50%;
		max-height: 50vh;
	}

	@media (min-width: 1300px) {
		svg {
			max-height: 200%;
			transform: translateY(-50%);
		}
	}

	@media (min-width: 750px) and (max-height: 900px) {
		svg {
			max-height: 130%;
			transform: translateY(-40%);
		}
	}
`;

export const AboutMe = styled.div`
	grid-area: aboutMe;

	${useFont.nunitoSans.regular};
	font-size: 17px;
	letter-spacing: 0.5px;
	line-height: 25px;

	b {
		color: #4764e6;
		font-weight: normal;
	}

	@media (min-width: 750px) {
		max-width: 90%;
		font-size: 0.95em;
	}

	@media (min-width: 1000px) {
		font-size: 17px;
	}
`;
