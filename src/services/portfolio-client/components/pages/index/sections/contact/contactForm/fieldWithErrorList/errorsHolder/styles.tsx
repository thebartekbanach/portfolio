import styled from "styled-components";

import { useFont } from "~/utils/useFont";

export const ErrorList = styled.div`
	margin: 0;
	padding: 0;

	& > div {
		// animate height internal wrapper
		position: relative;
	}

	span {
		display: block;

		margin: 0;
		padding-top: 10px;
		padding-left: 30px;

		${useFont.nunitoSans.semiBold};
		color: #fa6767;

		&::before,
		&::after {
			content: "";
			position: absolute;
		}

		&::before {
			top: 0;
			left: 13px;
			height: 100%;
			width: 3px;

			background: #fa6767;
		}

		&::after {
			top: calc(50% + 3px);
			left: 13px;
			height: 3px;
			width: 10px;

			background: #fa6767;
		}
	}

	& > div:last-child span::before {
		height: calc(50% + 3px);
	}
`;
