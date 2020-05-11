import { useTranslation } from "~/utils/i18next";
import { SkillTile } from "~/components/pages/index/skills/components/skillTiles";
import { SkillsGridAreaNames } from "~/components/pages/index/skills/styles/skillGrid";

import FrontendIcon from "../../../../../public/img/skills/categoryIcons/frontend.svg";
import BackendIcon from "../../../../../public/img/skills/categoryIcons/backend.svg";
import EmbeddedIcon from "../../../../../public/img/skills/categoryIcons/embedded.svg";
import { useSelector, useDispatch } from "react-redux";
import { skills } from "~/store/skills";

interface SkillTileInfo {
	tileAreaName: SkillsGridAreaNames;
	icon: React.ElementType;
	title: string;
	description: string;
	isSelected: boolean;
	onClick: () => void;
}

const renderSkillTiles = (tiles: SkillTileInfo[]) => {
	return tiles.map(tileSetup => {
		return <SkillTile key={tileSetup.title} {...tileSetup} />;
	});
};

export const CategoryPicker = () => {
	const { t } = useTranslation("skills");
	const selectedCategory = useSelector(skills.selectors.selectedCategoryName);
	const dispatch = useDispatch();

	const categories: SkillsGridAreaNames[] = ["frontend", "backend", "embedded"];

	const icons = {
		frontend: FrontendIcon,
		backend: BackendIcon,
		embedded: EmbeddedIcon
	};

	const tilesData = categories.map(category => ({
		tileAreaName: category,
		icon: icons[category],
		title: t(`categories.${category}.title`),
		description: t(`categories.${category}.description`),
		isSelected: selectedCategory === category,
		onClick: () => dispatch(skills.actions.changeActiveSkillsCategory.request(category))
	}));

	return <>{renderSkillTiles(tilesData)}</>;
};
