import { createReducer } from "deox";
import { CategoryName, BoardsLoadingState, BoardsContent } from "./models";
import { combineReducers } from "redux";
import { skills } from ".";

const selectedCategoryName = createReducer(null as CategoryName | null, handle => [
	handle(skills.actions.changeActiveSkillsCategory.request, (_, action) => action.payload.to)
]);

const boardsLoadingStateDefaultValue = {
	frontend: false,
	backend: false,
	embedded: false
};

const boardsLoadingState = createReducer(
	boardsLoadingStateDefaultValue as BoardsLoadingState,
	handle => [
		handle(skills.actions.changeActiveSkillsCategory.success, (state, action) => {
			const nextState = { ...state };
			nextState[action.payload.loaded] = true;
			return nextState;
		})
	]
);

const boardsContentDefaultValue = {
	frontend: [],
	backend: [],
	embedded: []
} as BoardsContent;

const boardsContent = createReducer(boardsContentDefaultValue, handle => [
	handle(skills.actions.setupBoardsContent, (_, action) => action.payload.contents)
]);

export const skillsReducers = {
	selectedCategoryName,
	boardsLoadingState,
	boardsContent
};

export default combineReducers(skillsReducers);
