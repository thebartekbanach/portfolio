import { State } from "~/store";
import { createSelector } from "reselect";

export const selectedCategoryName = (state: State) => state.skills.selectedCategoryName;

export const boardsLoadingState = (state: State) => state.skills.boardsLoadingState;

export const isSelectedBoardLoaded = createSelector(
	boardsLoadingState,
	selectedCategoryName,
	(state, catName) => (catName === null ? false : state[catName])
);

export const boardsContent = (state: State) => state.skills.boardsContent;

export const areBoardsContentsInitialized = createSelector(
	boardsContent,
	contents =>
		contents.frontend.length > 0 && contents.backend.length > 0 && contents.embedded.length > 0
);

export const selectedBoardContents = createSelector(
	boardsContent,
	selectedCategoryName,
	(contents, catName) => (catName === null ? [] : contents[catName])
);

export const selectedBoardImages = createSelector(selectedBoardContents, contents => [
	...new Set(contents?.flatMap(cat => cat.items.map(item => item.iconPath)))
]);
