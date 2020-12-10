import styled, { css } from "styled-components";

import { useFont } from "~/utils/useFont";

interface SenderEmailAddressProps {
	isValid?: boolean;
}

export const SenderEmailAddress = styled.input<SenderEmailAddressProps>`
	width: 100%;
	margin-top: 20px;
	padding: 20px 27px; // 30px - 3px border = 27px
	box-sizing: border-box;

	border: none;
	background: none;

	background: white;
	box-shadow: rgba(205, 205, 205, 0.45) 0px 9px 25px;

	border: 3px solid white;
	border-color: ${p => (p.isValid ? "white" : "#fa6767")};

	transition: box-shadow 300ms, border-color 300ms;
	outline: none;

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

	&:focus {
		${p =>
			p.isValid
				? css`
						box-shadow: rgba(94, 88, 248, 0.35) 0px 3px 15px;
				  `
				: null};
	}
`;
