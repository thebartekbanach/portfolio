import { FC } from "react";
import {
	SkillBoardContainer,
	SkillBoardWrapper,
	SkillBoardCategory,
	SkillBoardCategoryTitle,
	SkillBoardItemList,
	SkillBoardItem,
	SkillBoardItemIcon,
	SkillBoardItemIconWrapper,
	SkillBoardItemInfo,
	SkillBoardItemTitle,
	SkillBoardItemDescription,
	SkillBoardContent
} from "./styles/skillBoard";
import { BoardItem, BoardCategory } from "~/store/skills/models";
import { AnimatedLoader } from "~/components/shared/animatedLoader";

function renderSkillBoardItemDescription(description: string | undefined) {
	if (!description) {
		return null;
	}

	return <SkillBoardItemDescription>{description}</SkillBoardItemDescription>;
}

function renderSkillBoardItems(items: BoardItem[]) {
	return items.map(({ iconPath, iconScale, title, description }) => (
		<SkillBoardItem key={title}>
			<SkillBoardItemIconWrapper>
				<SkillBoardItemIcon src={iconPath} iconScale={iconScale ?? 1} />
			</SkillBoardItemIconWrapper>
			<SkillBoardItemInfo>
				<SkillBoardItemTitle>{title}</SkillBoardItemTitle>
				{renderSkillBoardItemDescription(description)}
			</SkillBoardItemInfo>
		</SkillBoardItem>
	));
}

function renderSkillBoardContent(boardId: string, categories: BoardCategory[]) {
	const content = categories.map(({ categoryName: title, items }) => (
		<SkillBoardCategory key={title}>
			<SkillBoardCategoryTitle>{title}</SkillBoardCategoryTitle>
			<SkillBoardItemList useSimplifiedGrid={items.length < 3}>
				{renderSkillBoardItems(items)}
			</SkillBoardItemList>
		</SkillBoardCategory>
	));

	return <SkillBoardContent key={boardId}>{content}</SkillBoardContent>;
}

interface SkillBoardComponentProps {
	boardId: string;
	content: { categories: BoardCategory[]; isBoardLoaded: boolean };
}

export const SkillBoardComponent: FC<SkillBoardComponentProps> = ({ boardId, content }) => {
	const { categories, isBoardLoaded } = content;

	const skillBoardContent = isBoardLoaded ? (
		renderSkillBoardContent(boardId, categories)
	) : (
		<AnimatedLoader />
	);

	return (
		<SkillBoardWrapper>
			<SkillBoardContainer>{skillBoardContent}</SkillBoardContainer>
		</SkillBoardWrapper>
	);
};
