import { Section } from "~/components/shared/layout/section";
import { SectionHeaders } from "~/components/shared/layout/sectionHeaders";
import { useTranslation } from "~/utils/i18next";
import { CategoryPicker } from "./categoryPicker";
import { SkillsBoard } from "./skillsBoard";
import { SkillsGrid } from "~/components/sections/skillsSection/skillTiles";

export const SkillsSection = () => {
	const { t } = useTranslation("skills");

	return (
		<Section>
			<SectionHeaders title={t("sectionTitle")} description={t("sectionDescription")} />
			<SkillsGrid activeCategoryName="frontend">
				<CategoryPicker />
				<SkillsBoard />
			</SkillsGrid>
		</Section>
	);
};
