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

interface SendMessageButtonProps {
	sendComplete: boolean;
	sendError: boolean;
}

export const SendMessageButton = styled.button<SendMessageButtonProps>`
	display: block;
	position: absolute;

	bottom: 0;
	left: 50%;

	margin: 0 auto;
	padding: 15px 30px;

	border: none;
	border-radius: 30px;

	transform: translateY(50%) translateX(-50%);

	box-shadow: 1.5px 1.4px 8px 0 rgba(94, 88, 248, 0.46);
	background: ${p => (p.sendComplete ? "#25C281" : p.sendError ? "#fa6767" : "#5e58f8")};

	transition: transform 300ms, box-shadow 250ms, background 300ms;

	outline: none;

	cursor: pointer;

	${useFont.nunitoSans.regular};
	white-space: nowrap;
	color: white;

	&:hover {
		transform: translateY(50%) translateX(-50%) scale(0.95);
		box-shadow: 0 0 0 0 rgba(94, 88, 248, 0.46);
	}
`;
