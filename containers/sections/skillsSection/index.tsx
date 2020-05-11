import { Section } from "~/components/shared/layout/section";
import { SectionHeaders } from "~/components/shared/layout/sectionHeaders";
import { useTranslation } from "~/utils/i18next";
import { CategoryPicker } from "./categoryPicker";
import { SkillsBoard } from "./skillsBoard";
import { SkillsGrid } from "~/components/sections/skillsSection/skillTiles";
import { useSelector } from "react-redux";
import { skills } from "~/store/skills";

export const SkillsSection = () => {
	const { t } = useTranslation("skills");
	const selectedCategoryName = useSelector(skills.selectors.selectedCategoryName);

	return (
		<Section>
			<SectionHeaders title={t("sectionTitle")} description={t("sectionDescription")} />
			<SkillsGrid activeCategoryName={selectedCategoryName || "none"}>
				<CategoryPicker />
				<SkillsBoard />
			</SkillsGrid>
		</Section>
	);
};
