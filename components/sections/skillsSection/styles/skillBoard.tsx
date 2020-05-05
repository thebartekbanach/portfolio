import styled from "styled-components";
import { useFont } from "~/utils/styles/fonts";

export const SkillBoardWrapper = styled.div`
	grid-area: board;
	padding: 0px 30px;

	@media (max-width: 900px) {
		width: 100%;
		max-width: 500px;
		margin: auto;
		padding: 0;
	}
`;

export const SkillBoardContainer = styled.div`
	display: grid;
	position: relative;
	grid-row-gap: 30px;
	padding: 52px 58px;
	box-shadow: 1.2px 1.6px 20px 0 rgba(94, 88, 248, 0.26);

	@media (max-width: 900px) {
		padding: 35px 40px;
	}

	@media (max-width: 450px) {
		grid-column-gap: 30px;
		padding: 35px 25px;
	}
`;

export const SkillBoardContent = styled.div``;

export const SkillBoardCategory = styled.div``;

export const SkillBoardCategoryTitle = styled.h1`
	${useFont.roboto.medium};
	color: #4764e6;
	font-size: 20px;
	letter-spacing: 0.7px;
	margin-bottom: 30px;

	@media (max-width: 900px) {
		margin-bottom: 35px;
		text-align: center;
	}
`;

interface SkillBoartItemListProps {
	useSimplifiedGrid?: boolean;
}

export const SkillBoardItemList = styled.ul<SkillBoartItemListProps>`
	display: grid;
	grid-template-columns: 1fr 1fr ${(p) => (p.useSimplifiedGrid ? "" : "1fr")};
	grid-gap: 30px;
	padding: 5px 13px;
	box-sizing: border-box;

	list-style: none;
	margin: 0;

	@media (max-width: 900px) {
		grid-template-columns: 1fr 1fr;
	}
`;

export const SkillBoardItem = styled.li`
	display: flex;
	align-items: center;

	@media (max-width: 900px) {
		display: grid;
		grid-template-rows: 1fr 1fr;
	}
`;

export const SkillBoardItemIconWrapper = styled.span`
	position: relative;
	display: inline-block;
	width: 50px;
	height: 50px;

	@media (max-width: 900px) {
		display: block;
		margin: auto;
	}
`;

interface SkillBoardItemIconProps {
	iconScale: number;
}

export const SkillBoardItemIcon = styled.img<SkillBoardItemIconProps>`
	position: absolute;
	display: block;
	top: 50%;
	width: 100%;
	transform: translateY(-50%) scale(${(p) => p.iconScale});
	overflow: hidden;
`;

export const SkillBoardItemInfo = styled.span`
	display: inline-block;
	margin-left: 25px;

	@media (max-width: 900px) {
		display: block;
		text-align: center;
		margin: auto;
		margin-top: 15px;
	}
`;

export const SkillBoardItemTitle = styled.div`
	${useFont.roboto.medium};
	color: #212121;
	font-size: 17px;
	letter-spacing: 0.6px;
`;

export const SkillBoardItemDescription = styled.div`
	${useFont.roboto.regular};
	color: #433b4a;
	font-size: 15px;
	letter-spacing: 0.5px;
	margin-top: 5px;
`;
