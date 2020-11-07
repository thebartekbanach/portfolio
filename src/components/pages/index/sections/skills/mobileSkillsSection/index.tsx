import { FC, useState } from "react";

import { SkillCategoryRoot } from "..";
import { SkillBoard } from "../skillBoard";
import { SkillTile } from "../skillTile";
import { SkillsSectionGrid } from "../styles";

interface MobileSkillsSectionProps {
	categoryRoots: SkillCategoryRoot[];
}

export const MobileSkillsSection: FC<MobileSkillsSectionProps> = ({ categoryRoots }) => {
	const [selectedCategory, setSelectedCategory] = useState(null as number | null);

	const renderedTiles = categoryRoots.map((tile, currentIndex) => (
		<SkillTile
			key={tile.title}
			index={currentIndex}
			icon={tile.icon}
			title={tile.title}
			description={tile.description}
			isSelected={selectedCategory === currentIndex}
			onClick={() => setSelectedCategory(currentIndex)}
		/>
	));

	const currentCategoryItems =
		selectedCategory === null
			? null
			: categoryRoots.map(tile => tile.content)[selectedCategory];

	const renderedCategory =
		currentCategoryItems === null ? null : <SkillBoard categories={currentCategoryItems} />;

	return (
		<SkillsSectionGrid>
			{renderedTiles}
			{renderedCategory}
		</SkillsSectionGrid>
	);
};
