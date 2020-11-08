import styled from "styled-components";

import { useFont } from "~/utils/useFont";

export const SkillBoardWrapper = styled.div`
	@media (min-width: 1000px) {
		grid-area: board;
	}
`;

export const SkillBoardElement = styled.div`
	max-width: 75%;
	margin: 0 auto;

	padding: 30px 25px;
	box-sizing: border-box;

	background: white;
	box-shadow: 1.8px 2.4px 21px 0 rgba(150, 150, 150, 0.58);

	@media (min-width: 1000px) {
		max-width: 90%;
		padding: 30px 125px;
	}
`;

export const SkillBoardCategory = styled.div`
	margin-top: 20px;

	@media (min-width: 1000px) {
		margin: 40px 0;
	}
`;

export const SkillBoardCategoryName = styled.h4`
	margin-top: 0;
	margin-bottom: 20px;

	${useFont.roboto.bold};
	text-align: center;
	font-size: 17px;
	color: #4764e6;

	@media (min-width: 1000px) {
		text-align: left;
		font-size: 19px;
	}
`;

export const SkillBoardCategoryItems = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;

	@media (min-width: 1000px) {
		grid-template-columns: 1fr 1fr 1fr;
		grid-column-gap: 50px;
		grid-row-gap: 10px;
		padding: 0 20px;
		padding-top: 10px;
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
