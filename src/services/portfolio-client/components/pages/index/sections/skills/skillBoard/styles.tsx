import styled from "styled-components";

import { useFont } from "~/utils/useFont";

export const SkillBoardWrapper = styled.div`
	@media (min-width: 1000px) {
		grid-area: board;
	}
`;

export const SkillBoardBody = styled.div`
	width: 75%;
	max-width: 400px;
	margin: 0 auto;

	background: white;
	box-shadow: 0px 9px 25px rgba(205, 205, 205, 0.45);

	@media (min-width: 1000px) {
		width: 80%;
		max-width: 900px;
	}
`;

export const SkillBoardContentElement = styled.div`
	padding: 30px 25px;
	box-sizing: border-box;
`;

export const SkillBoardCategory = styled.div`
	margin-top: 30px;

	@media (min-width: 1000px) {
		max-width: calc(100% - 80px);

		margin: 0 auto;
		margin-top: 30px;
	}
`;

export const SkillBoardCategoryName = styled.h4`
	max-width: 250px;

	margin: 0 auto;
	margin-bottom: 30px;

	${useFont.roboto.bold};
	text-align: center;
	font-size: 17px;
	color: #4764e6;

	@media (min-width: 1000px) {
		text-align: left;
		font-size: 19px;

		margin: 0 0 20px 0;

		max-width: none;
	}
`;

export const SkillBoardCategoryItems = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-row-gap: 15px;

	max-width: 300px;
	margin: 0 auto;

	@media (min-width: 1000px) {
		grid-template-columns: 1fr 1fr 1fr;

		grid-column-gap: 50px;
		grid-row-gap: 15px;

		padding: 0 20px;
		padding-top: 10px;

		max-width: none;
		margin: 0;
	}
`;

export const SkillBoardCategoryItem = styled.div`
	text-align: center;
	margin-bottom: 20px;

	@media (min-width: 1000px) {
		display: grid;
		grid-template-areas: "icon title-and-description";
		grid-template-columns: 40px auto;
		grid-column-gap: 20px;
	}
`;

export const SkillBoardCategoryItemNameAndDescriptionWrapper = styled.div`
	@media (min-width: 1000px) {
		grid-area: title-and-description;
		display: flex;
		flex-direction: column;
		justify-content: center;

		text-align: left;
	}
`;

export const SkillBoardCategoryItemIcon = styled.img`
	display: block;
	width: 40px;
	height: 40px;
	margin: 0 auto;

	@media (min-width: 1000px) {
		grid-area: icon;
	}
`;

export const SkillBoardCategoryItemName = styled.h5`
	margin: 10px 0 0 0;
	word-spacing: 100vw;

	${useFont.roboto.bold};
	letter-spacing: 1px;
	font-size: 14px;
	color: #212121;

	@media (min-width: 1000px) {
		margin-top: 0;
		font-size: 16px;
	}
`;

export const SkillBoardCategoryItemComment = styled.div`
	margin-top: 5px;

	${useFont.roboto.regular};
	letter-spacing: 0.5px;
	font-size: 12px;
	color: #433b4a;

	@media (min-width: 1000px) {
		margin-top: 0;
		font-size: 14px;
	}
`;
