import styled from "styled-components";

import { useFont } from "~/utils/useFont";

export const GithubSectionElement = styled.section`
	position: relative;

	max-width: 1200px;

	margin: 0 auto;
	margin-top: 150px;
	margin-bottom: 80px;
	padding: 80px 40px;

	background: #1c1d20;
	box-shadow: 3.5px 4.9px 20.6px 0.4px rgba(116, 116, 116, 0.78);

	text-align: center;
`;

interface GithubInfoBackgroundProps {
	isVisible: boolean;
}

export const GithubInfoBackground = styled.div<GithubInfoBackgroundProps>`
	position: absolute;

	top: 0;
	left: 0;
	width: 100%;
	height: 100%;

	z-index: 0;

	opacity: ${p => (p.isVisible ? 1 : 0)};
	transition: opacity ${p => (p.isVisible ? 1000 : 0)}ms;

	canvas {
		position: absolute;

		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
`;

export const GithubInfoContent = styled.div`
	position: relative;
	z-index: 1;
`;

export const GithubInfoIconWrapper = styled.div`
	margin: 0 auto;
	width: 80px;
`;

export const GithubInfoTitle = styled.h3`
	margin-top: 30px;
	margin-bottom: 15px;

	${useFont.nunitoSans.semiBold};
	font-size: 27px;
	letter-spacing: 1px;
	color: white;
`;

export const GithubInfoDescription = styled.p`
	margin: 0 auto;
	max-width: 800px;

	${useFont.nunitoSans.regular};
	letter-spacing: 0.5px;
	line-height: 21px;
	color: #b8b8b8;

	@media (max-width: 450px) {
		br {
			display: none;
		}
	}
`;

export const GithubInfoDetailsButton = styled.a`
	display: inline-block;

	margin-top: 25px;

	padding: 15px 50px;
	border-radius: 30px;

	background: #5e58f8;
	box-shadow: 1.5px 1.4px 8px 0 rgba(94, 88, 248, 0.46);

	transition: transform 300ms, box-shadow 250ms;

	${useFont.nunitoSans.regular};
	text-decoration: none;
	letter-spacing: 0.5px;
	color: white;

	&:hover {
		transform: scale(0.95);
		box-shadow: 0px 0px 0px 0 rgba(94, 88, 248, 0.46);
	}
`;
