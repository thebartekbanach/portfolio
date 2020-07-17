import { SkillBoardComponent } from "~/components/pages/index/skills/components/skillBoard";
import { useSelector } from "react-redux";
import { skills } from "~/store/skills";
import { FC } from "react";

interface SkillsBoardProps {
	onBoardHide: () => void;
}

export const SkillsBoard: FC<SkillsBoardProps> = ({ onBoardHide }) => {
	const activeBoardName = useSelector(skills.selectors.selectedCategoryName) || "none";
	const activeBoardContents = useSelector(skills.selectors.selectedBoardContents);
	const isActiveBoardLoaded = useSelector(skills.selectors.isSelectedBoardLoaded);

	if (activeBoardName === "none") {
		return null;
	}

	return (
		<SkillBoardComponent
			boardId={activeBoardName}
			onBoardHide={onBoardHide}
			content={{
				categories: activeBoardContents,
				isBoardLoaded: isActiveBoardLoaded
			}}
		/>
	);
};
