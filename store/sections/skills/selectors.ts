import { State } from "~/store";
import { createSelector } from "reselect";

export const selectedCategoryName = (state: State) => state.sections.skills.selectedCategoryName;

export const boardsLoadingState = (state: State) => state.sections.skills.boardsLoadingState;

export const isSelectedBoardLoaded = createSelector(
	boardsLoadingState,
	selectedCategoryName,
	(state, catName) => state[catName]
);

export const boardsContent = (state: State) => state.sections.skills.boardsContent;

export const selectedBoardContents = createSelector(
	boardsContent,
	selectedCategoryName,
	(contents, catName) => contents[catName]
);

export const selectedBoardImages = createSelector(selectedBoardContents, contents => [
	...new Set(contents.flatMap(cat => cat.items.map(item => item.iconPath)))
]);
