import { skillsReducers } from "../reducers";
import { skills } from "..";
import { createMock } from "ts-auto-mock";
import { BoardsContent, BoardsLoadingState } from "../models";

describe("skillsReducers", () => {
	describe("selectedCategoryName", () => {
		it("should change selected category", () => {
			const initialState = "frontend";
			const action = skills.actions.changeActiveSkillsCategory.request("backend");

			const result = skillsReducers.selectedCategoryName(initialState, action);

			expect(result).toEqual("backend");
		});
	});

	describe("boardsLoadingState", () => {
		it("should set board load state to loaded if changeActiveSkillCategory.success action ocurred", () => {
			const initialState: BoardsLoadingState = {
				frontend: false,
				backend: false,
				embedded: false
			};
			const action = skills.actions.changeActiveSkillsCategory.success("backend");

			const result = skillsReducers.boardsLoadingState(initialState, action);

			expect(result.backend).toBe(true);
		});
	});

	describe("boardsContent", () => {
		it("should set boards content", () => {
			const initialState = createMock<BoardsContent>();
			const nextState = createMock<BoardsContent>();
			const action = skills.actions.setupBoardsContent(nextState);

			const result = skillsReducers.boardsContent(initialState, action);

			expect(result).toBe(nextState);
		});
	});
});
