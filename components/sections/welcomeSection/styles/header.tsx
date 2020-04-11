import styled from "styled-components";
import { useFont } from "~/utils/styles/fonts";

export const HeaderContainer = styled.div`
	padding-top: 120px;

	@media (max-width: 1150px) {
		padding-top: 100px;
	}

	@media (max-width: 800px) {
		padding-top: 20px;
		padding-bottom: 20px;
	}
`;

export const NameHeader = styled.h1`
	${useFont.nunitoSans.bold};
	font-size: 75px;
	letter-spacing: 2px;
	margin-bottom: 10px;
	margin-left: -5px;
	margin-top: 0;
	color: #4764e6;

	@supports (-webkit-text-fill-color: transparent) and
		((-webkit-background-clip: text) or (background-clip: text)) {
		background: linear-gradient(to top, #4764e6, #694fff);
		-webkit-text-fill-color: transparent;
		-webkit-background-clip: text;
		background-clip: text;
	}

	@media (max-width: 1150px) {
		font-size: 65px;
	}

	@media (max-width: 800px) {
		font-size: 11vw;
	}

	@media (max-width: 300px) {
		font-size: 45px;
	}
`;

export const SpecializationSubheader = styled.h2`
	${useFont.nunitoSans.semiBold};
	font-size: 30px;
	letter-spacing: 1px;
	color: #4764e6;
	margin-top: 10px;
	margin-bottom: 20px;
	margin-left: -2px;

	@media (max-width: 800px) {
		font-size: 5.5vw;
	}

	@media (max-width: 300px) {
		font-size: 20px;
	}
`;
