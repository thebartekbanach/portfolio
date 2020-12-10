import styled from "styled-components";

import { useFont } from "~/utils/useFont";

export const ContactFormWrapper = styled.div`
	position: relative; // for send message button
	display: grid;

	height: 100%;

	grid-template-rows: auto auto 1fr;

	width: 80%;
	margin: 0 auto;
	padding-top: 20px;

	@media (min-width: 900px) {
		width: 100%;
		padding-top: 0;
	}
`;

export const SendMessageButton = styled.button`
	display: block;
	position: absolute;

	bottom: 0;
	left: 50%;

	margin: 0 auto;
	padding: 15px 30px;

	border: none;
	border-radius: 30px;

	transform: translateY(50%) translateX(-50%);

	background: #5e58f8;
	box-shadow: 1.5px 1.4px 8px 0 rgba(94, 88, 248, 0.46);

	transition: transform 300ms, box-shadow 250ms;

	cursor: pointer;

	${useFont.nunitoSans.regular};
	white-space: nowrap;
	color: white;

	&:hover {
		transform: translateY(50%) translateX(-50%) scale(0.95);
		box-shadow: 0 0 0 0 rgba(94, 88, 248, 0.46);
	}
`;
