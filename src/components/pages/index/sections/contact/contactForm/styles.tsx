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

export const SenderEmailAddress = styled.input`
	width: 100%;
	margin-top: 20px;
	padding: 20px 30px;
	box-sizing: border-box;

	box-shadow: 3.5px 4.9px 20.6px 0.4px rgba(94, 88, 248, 0.55);
	background: white;

	border: none;
	background: none;

	&,
	&::placeholder {
		${useFont.nunitoSans.regular};
		color: #5d5d5d;
		opacity: 1;
	}

	&::placeholder {
		max-width: 100%;
		text-overflow: ellipsis;
	}
`;

export const MessageBox = styled.textarea`
	width: 100%;
	margin-top: 20px;
	margin-bottom: 0;
	padding: 20px 30px;
	box-sizing: border-box;

	resize: none;
	min-height: 250px;

	border: none;
	box-shadow: 3.5px 4.9px 20.6px 0.4px rgba(94, 88, 248, 0.55);
	background: white;

	&,
	&::placeholder {
		${useFont.nunitoSans.regular};
		color: #5d5d5d;
		opacity: 1;
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
