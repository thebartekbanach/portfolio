import styled from "styled-components";
import { useFont } from "~/utils/styles/fonts";

export const NavbarWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;

	height: 150px;
	width: 100%;
	box-sizing: border-box;
	padding: 0 52px;

	${useFont.nunitoSans.semiBold};
	font-size: 18px;
	letter-spacing: 0.6px;

	@media (max-width: 1000px) {
		font-size: 30px;
	}

	@media (max-width: 500px) {
		height: 100px;
		margin-bottom: 15px;
		padding: 0 7.5vw;
	}
`;
