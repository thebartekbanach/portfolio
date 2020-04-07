import styled from "styled-components";
import { fonts } from "~/utils/styles/fonts";

export const ContactButton = styled.button`
	display: inline-block;
	padding: 18px 38px;
	padding-bottom: 16px;

	border-radius: 50px;
	border: none;

	font-family: ${fonts.nunitoSans};
	font-weight: bold;
	color: white;
	letter-spacing: 0.6px;

	background: #4764e6;
	box-shadow: 4.3px 2.5px 16px 0 #4764e6;
	transition: background 250ms, transform 250ms, box-shadow 250ms;

	backface-visibility: hidden;

	cursor: pointer;

	@media (min-width: 1001px) {
		margin-left: 20px;
	}

	@media (max-width: 1000px) {
		margin-top: 15px;
		font-size: 20px;
	}

	&:hover {
		background: #3051e2;
		box-shadow: 0px 0px 0px 0 #4764e6;
		transform: scale(0.98) translateZ(0);
	}

	&:active {
		transform: scale(0.96) translateZ(0);
	}
`;
