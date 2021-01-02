import styled from "styled-components";

import { useFont } from "~/utils/useFont";

export const AboutMeTile = styled.div`
	position: relative;

	width: 80%;
	margin: 0 auto;

	padding: 60px 30px;
	padding-bottom: 0;

	box-sizing: border-box;
	box-shadow: rgba(205, 205, 205, 0.45) 0px 9px 25px;

	@media (min-width: 900px) {
		width: 100%;
		padding: 40px 60px;
		padding-bottom: 0;
	}
`;

export const ProfilePictureWrapper = styled.div`
	position: relative;

	width: 120px;
	height: 120px;

	margin: 0 auto;

	overflow: hidden;
	border-radius: 50%;

	img {
		display: block;
		position: absolute;

		top: 50%;
		left: 0;
		width: 100%;

		transform: translateY(-50%);

		transition: opacity 500ms;

		&.enter {
			opacity: 0;
		}
	}

	// gray circle, placeholder
	div {
		position: absolute;

		top: 0;
		left: 0;
		width: 100%;
		height: 100%;

		background: #f5f5f5;

		transition: opacity 500ms;

		&.exit-active {
			opacity: 0;
		}
	}
`;

export const MyName = styled.h3`
	margin-top: 30px;

	${useFont.nunitoSans.bold};
	text-align: center;
	font-size: 19px;
	letter-spacing: 0.5px;
	color: #121212;

	@media (min-width: 350px) {
		font-size: 23px;
	}
`;

export const AboutMeText = styled.p`
	margin: 0 auto;
	max-width: 300px;

	${useFont.nunitoSans.regular};
	letter-spacing: 0.3px;
	line-height: 21px;
	text-align: center;
`;

export const SocialsWrapper = styled.div`
	padding: 20px 0;
	padding-bottom: 60px;

	text-align: center;

	@media (min-width: 900px) {
		padding-bottom: 30px;
	}
`;

export const SocialLink = styled.a`
	display: inline-block;

	width: 30px;
	height: 30px;

	padding: 10px;

	opacity: 0.6;
	filter: grayscale(1);
	transition: filter 300ms, opacity 300ms;

	svg {
		width: 100%;
	}

	&:hover {
		opacity: 1;
		filter: grayscale(0);
	}
`;

export const MobileOpenContactFormButton = styled.button`
	display: block;
	position: absolute;

	bottom: 0;
	left: 50%;
	width: auto;

	margin: 0 auto;
	padding: 15px 30px;

	border: none;
	border-radius: 30px;

	transform: translateY(calc(50% - 1px)) translateX(-50%);

	background: #5e58f8;
	box-shadow: 1.5px 1.4px 8px 0 rgba(94, 88, 248, 0.46);

	transition: transform 300ms, box-shadow 250ms;

	outline: none;

	cursor: pointer;

	${useFont.nunitoSans.regular};
	white-space: nowrap;
	color: white;

	&:hover {
		transform: translateY(calc(50% - 1px)) translateX(-50%) scale(0.95);
		box-shadow: 0 0 0 0 rgba(94, 88, 248, 0.46);
	}

	@media (min-width: 900px) {
		display: none;
	}
`;

export const MobileOpenContactFormButtonArrow = styled.div`
	display: block;
	position: relative;
	width: 30px;
	height: 14px;

	&::before,
	&::after {
		content: "";
		display: block;
		position: absolute;
		top: 50%;
		left: 50%;
		width: 14px;
		height: 3px;
		background: white;
	}

	&::before {
		transform: translateX(calc(-50% - 4px)) rotate(-45deg);
	}

	&::after {
		transform: translateX(calc(-50% + 4px)) rotate(45deg);
	}
`;
