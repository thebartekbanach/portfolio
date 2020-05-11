import { BoardCategory, BoardsContent } from "../models";
import { skills } from "..";

describe("skillsSection.selectors.isSelectedBoardLoaded", () => {
	it("should return correct state of active category", () => {
		const boardsLoadingState = {
			frontend: true,
			backend: false,
			embedded: true
		};
		const selectedCategoryName = "backend";

		const result = skills.selectors.isSelectedBoardLoaded.resultFunc(
			boardsLoadingState,
			selectedCategoryName
		);

		expect(result).toBe(false);
	});
});

describe("skillsSection.selectors.selectedBoardContents", () => {
	it("should return contents of correct board", () => {
		const contents: BoardsContent = {
			frontend: [],
			backend: [],
			embedded: []
		};
		const selectedCategory = "embedded";

		const result = skills.selectors.selectedBoardContents.resultFunc(
			contents,
			selectedCategory
		);

		expect(result).toBe(contents.embedded);
	});
});

describe("skillsSection.selectors.selectedBoardImages", () => {
	it("should return flattened map of every image from selected category", () => {
		const categories: BoardCategory[] = [
			{
				categoryName: "Programming languages",
				items: [
					{
						iconPath: "/some/path/1",
						title: "Some title 1"
					},
					{
						iconPath: "/some/path/2",
						title: "Some title 2"
					},
					{
						iconPath: "/some/path/3",
						title: "Some title 3"
					}
				]
			},
			{
				categoryName: "Libraries",
				items: [
					{
						iconPath: "/some/path/4",
						title: "Some title 4"
					},
					{
						iconPath: "/some/path/5",
						title: "Some title 5"
					},
					{
						iconPath: "/some/path/6",
						title: "Some title 6"
					}
				]
			}
		];

		const result = skills.selectors.selectedBoardImages.resultFunc(categories);

		expect(result).toEqual([
			"/some/path/1",
			"/some/path/2",
			"/some/path/3",
			"/some/path/4",
			"/some/path/5",
			"/some/path/6"
		]);
	});

	it("should not double paths on result array", () => {
		const categories: BoardCategory[] = [
			{
				categoryName: "Programming languages",
				items: [
					{
						iconPath: "/some/path/1",
						title: "Some title 1"
					},
					{
						iconPath: "/some/path/2",
						title: "Some title 2"
					},
					{
						iconPath: "/some/path/2",
						title: "Some title 3"
					}
				]
			},
			{
				categoryName: "Libraries",
				items: [
					{
						iconPath: "/some/path/4",
						title: "Some title 4"
					},
					{
						iconPath: "/some/path/5",
						title: "Some title 5"
					},
					{
						iconPath: "/some/path/5",
						title: "Some title 6"
					}
				]
			}
		];

		const result = skills.selectors.selectedBoardImages.resultFunc(categories);

		expect(result).toEqual(["/some/path/1", "/some/path/2", "/some/path/4", "/some/path/5"]);
	});
});
