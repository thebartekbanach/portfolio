import styled, { css } from "styled-components";

import { useFont } from "~/utils/useFont";

interface MessageBoxProps {
	emptyMessageError: boolean;
}

export const MessageBox = styled.textarea<MessageBoxProps>`
	width: 100%;
	margin-top: 20px;
	margin-bottom: 0;
	padding: 20px 27px; // 30px - 3px border = 27px
	box-sizing: border-box;

	resize: none;
	min-height: 250px;

	border: none;
	box-shadow: rgba(205, 205, 205, 0.45) 0px 9px 25px;
	background: white;

	border: 3px solid white;
	border-color: ${p => (p.emptyMessageError ? "#fa6767" : "white")};

	transition: box-shadow 300ms, border-color 300ms;

	&,
	&::placeholder {
		${useFont.nunitoSans.regular};
		line-height: 1.4em;
		color: #5d5d5d;
		opacity: 1;
	}

	&:focus {
		${p =>
			p.emptyMessageError
				? null
				: css`
						box-shadow: rgba(94, 88, 248, 0.35) 0px 3px 15px;
				  `};
	}
`;
