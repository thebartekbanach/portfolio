import styled from "styled-components";
import { fonts } from "~/utils/styles/fonts";

export const NavbarWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;

	width: 100%;
	box-sizing: border-box;
	padding: 56px 52px;

	font-size: 18px;
	font-family: ${fonts.nunitoSans};
	font-weight: bold;
	letter-spacing: 0.6px;

	@media (max-width: 1000px) {
		font-size: 30px;
	}

	@media (max-width: 500px) {
		justify-content: space-evenly;
		padding: 40px 0px;
	}
`;
