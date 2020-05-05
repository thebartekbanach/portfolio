import { SkillBoardComponent } from "~/components/sections/skillsSection/skillBoard";
import { useSelector } from "react-redux";
import { skillsSection } from "~/store/sections/skills";

export const SkillsBoard = () => {
	const activeBoardName = useSelector(skillsSection.selectors.selectedCategoryName);
	const activeBoardContents = useSelector(skillsSection.selectors.selectedBoardContents);
	const isActiveBoardLoaded = useSelector(skillsSection.selectors.isSelectedBoardLoaded);

	return (
		<SkillBoardComponent
			boardId={activeBoardName}
			content={{
				categories: activeBoardContents,
				isBoardLoaded: isActiveBoardLoaded
			}}
		/>
	);
};
