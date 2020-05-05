import styled from "styled-components";

export type SkillsGridAreaNames = "frontend" | "backend" | "embedded";

interface SkillsGridProps {
	activeCategoryName: SkillsGridAreaNames | "none";
}

function templateAreasForActiveCategory({ activeCategoryName }: SkillsGridProps) {
	const tiles = ["frontend", "backend", "embedded"];

	const createTemplateAreas = (array: string[]) =>
		array.reduce(
			(result, current) => (result == tiles[0] ? `"${tiles[0]}"` : result) + ` "${current}"`
		);

	if (activeCategoryName === "none") {
		return createTemplateAreas(tiles);
	}

	const activeCategoryPos = tiles.findIndex(t => t === activeCategoryName);
	tiles.splice(activeCategoryPos + 1, 0, "board");

	return createTemplateAreas(tiles);
}

export const SkillsGrid = styled.div<SkillsGridProps>`
	display: grid;
	width: 80%;
	margin: auto;
	margin-bottom: 100px;

	grid-template-areas: "frontend backend embedded" "board board board";
	grid-column-gap: 25px;
	grid-row-gap: 70px;

	@media (max-width: 1050px) {
		width: 90%;
	}

	@media (max-width: 900px) {
		width: calc(100% - 60px);
		grid-template-areas: ${templateAreasForActiveCategory};
		grid-row-gap: 30px;
	}
`;
