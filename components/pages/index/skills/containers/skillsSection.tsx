import { useSelector } from "react-redux";
import { skills } from "~/store/skills";
import { useTranslation } from "~/utils/i18next";
import { Section } from "~/components/shared/layout/components/section";
import { SectionHeaders } from "~/components/shared/layout/components/sectionHeaders";
import { SkillsGrid } from "~/components/pages/index/skills/components/skillTiles";
import { CategoryPicker } from "./categoryPicker";
import { SkillsBoard } from "./skillsBoard";
import { useState } from "react";

export const SkillsSection = () => {
	const { t } = useTranslation("skills");

	const activeCategoryName = useSelector(skills.selectors.selectedCategoryName);
	const [selectedCategoryName, setSelectedCategoryName] = useState(activeCategoryName);

	const changeCategory = () => setSelectedCategoryName(activeCategoryName);

	return (
		<Section>
			<SectionHeaders title={t("sectionTitle")} description={t("sectionDescription")} />
			<SkillsGrid activeCategoryName={selectedCategoryName || "none"}>
				<CategoryPicker />
				<SkillsBoard onBoardHide={changeCategory} />
			</SkillsGrid>
		</Section>
	);
};
