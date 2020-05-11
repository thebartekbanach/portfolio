import { createActionCreator } from "deox";
import { CategoryName, BoardsContent } from "./models";

export const setupSkillsSection = createActionCreator("sections/skills/setupSkillsSection");

export const setupBoardsContent = createActionCreator(
	"sections/skills/setupBoardsContent",
	resolve => (contents: BoardsContent) => resolve({ contents })
);

export const changeActiveSkillsCategory = {
	request: createActionCreator(
		"sections/skills/changeActiveCategory/request",
		resolve => (categoryName: CategoryName) => resolve({ to: categoryName })
	),
	success: createActionCreator(
		"sections/skills/changeActiveCategory/success",
		resolve => (categoryName: CategoryName) => resolve({ loaded: categoryName })
	),
	failed: createActionCreator(
		"sections/skills/changeActiveCategory/failed",
		resolve => (categoryName: CategoryName, reason?: Error) => resolve({ categoryName, reason })
	)
};
