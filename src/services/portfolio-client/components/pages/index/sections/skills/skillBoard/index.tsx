import React, { FC } from "react";

import {
	SkillBoardCategory,
	SkillBoardCategoryItem,
	SkillBoardCategoryItemComment,
	SkillBoardCategoryItemIcon,
	SkillBoardCategoryItemName,
	SkillBoardCategoryItemNameAndDescriptionWrapper,
	SkillBoardCategoryItems,
	SkillBoardCategoryName,
	SkillBoardContentElement
} from "./styles";

export interface SkillInfo {
	iconUrl: string;
	name: string;
	comment?: string;
}

export interface SkillCategory {
	categoryName: string;
	items: SkillInfo[];
}

interface SkillBoardProps {
	categories: SkillCategory[];
}

function renderCategory({ categoryName, items }: SkillCategory) {
	const renderedCategoryItems = items.map(({ iconUrl, name, comment }) => {
		const renderedComment =
			comment === undefined ? null : (
				<SkillBoardCategoryItemComment>{comment}</SkillBoardCategoryItemComment>
			);

		return (
			<SkillBoardCategoryItem key={name}>
				<SkillBoardCategoryItemIcon src={iconUrl} />
				<SkillBoardCategoryItemNameAndDescriptionWrapper>
					<SkillBoardCategoryItemName>{name}</SkillBoardCategoryItemName>
					{renderedComment}
				</SkillBoardCategoryItemNameAndDescriptionWrapper>
			</SkillBoardCategoryItem>
		);
	});

	return (
		<SkillBoardCategory key={categoryName}>
			<SkillBoardCategoryName>{categoryName}</SkillBoardCategoryName>
			<SkillBoardCategoryItems>{renderedCategoryItems}</SkillBoardCategoryItems>
		</SkillBoardCategory>
	);
}

export const SkillBoardContent: FC<SkillBoardProps> = ({ categories }) => {
	const renderedCategories = categories.map(renderCategory);

	return <SkillBoardContentElement>{renderedCategories}</SkillBoardContentElement>;
};
