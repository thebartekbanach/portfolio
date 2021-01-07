import styled from "styled-components";

import { useFont } from "~/utils/useFont";

export const LanguageSwitchWrapper = styled.div`
	position: fixed;
	z-index: 100;

	bottom: 0;
	right: 0px;

	border-top-left-radius: 5px;

	background: white;
	box-shadow: 0px 0px 25px rgba(205, 205, 205, 0.45);

	${useFont.nunitoSans.extraBold};
	font-size: 14px;
	color: #333;
`;

interface AvailableLanguageProps {
	isSelected: boolean;
}

export const AvailableLanguage = styled.span<AvailableLanguageProps>`
	display: inline-block;
	padding: 10px 15px;

	${p => (p.isSelected ? useFont.nunitoSans.extraBold : useFont.nunitoSans.semiBold)}
	color: ${p => (p.isSelected ? "#5f55f7" : "#333")};

	cursor: ${p => (p.isSelected ? "initial" : "pointer")};

	&:nth-child(1) {
		padding-right: 5px;
	}

	&:nth-child(2) {
		padding-left: 5px;
	}
`;
