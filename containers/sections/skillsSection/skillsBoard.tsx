import { SkillBoardComponent } from "~/components/sections/skillsSection/skillBoard";
import { useSelector } from "react-redux";
import { skills } from "~/store/skills";

export const SkillsBoard = () => {
	const activeBoardName = useSelector(skills.selectors.selectedCategoryName) || "none";
	const activeBoardContents = useSelector(skills.selectors.selectedBoardContents);
	const isActiveBoardLoaded = useSelector(skills.selectors.isSelectedBoardLoaded);

	if (activeBoardName === "none") {
		return null;
	}

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
