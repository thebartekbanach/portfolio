import React, { FC, useRef, useState } from "react";

import { ReplacementContainer } from "~/components/shared/replacementContainer";

import { SkillCategoryRoot } from "..";
import { SkillBoardContent } from "../skillBoard";
import { SkillBoardWrapper, SkillBoardBody } from "../skillBoard/styles";
import { SkillTile } from "../skillTile";
import { SkillsSectionGrid } from "../styles";

interface DesktopSkillsSectionProps {
	categoryRoots: SkillCategoryRoot[];
}

export const DesktopSkillsSection: FC<DesktopSkillsSectionProps> = ({ categoryRoots }) => {
	const [selectedCategory, setSelectedCategory] = useState(0);
	const isAnimating = useRef(false);

	const onSkillTileClick = (tileIndex: number) => () => {
		if (selectedCategory === tileIndex || isAnimating.current) {
			return;
		}

		isAnimating.current = true;
		setSelectedCategory(tileIndex);
	};

	const renderedSkillTiles = categoryRoots.map((tile, currentIndex) => (
		<SkillTile
			key={tile.title}
			index={currentIndex}
			icon={tile.icon}
			title={tile.title}
			description={tile.description}
			isSelected={selectedCategory === currentIndex}
			onClick={onSkillTileClick(currentIndex)}
		/>
	));

	const currentCategoryContent = categoryRoots.map(root => root.content)[selectedCategory];

	return (
		<SkillsSectionGrid>
			{renderedSkillTiles}
			<SkillBoardWrapper>
				<SkillBoardBody>
					<ReplacementContainer onAnimationEnd={() => (isAnimating.current = false)}>
						<SkillBoardContent
							key={selectedCategory}
							categories={currentCategoryContent}
						/>
					</ReplacementContainer>
				</SkillBoardBody>
			</SkillBoardWrapper>
		</SkillsSectionGrid>
	);
};
