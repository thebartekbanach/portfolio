import React, { FC } from "react";

import { SectionHeader } from "~/components/shared/sectionHeader";
import { useTranslation } from "~/utils/i18next";

import BackendIcon from "../../../../../public/assets/pages/index/skills/categories/backend/category-icon.svg";
import EmbeddedIcon from "../../../../../public/assets/pages/index/skills/categories/embedded/category-icon.svg";
import FrontendIcon from "../../../../../public/assets/pages/index/skills/categories/frontend/category-icon.svg";

import { MobileSkillsSection } from "./mobileSkillsSection";
import { SkillCategory } from "./skillBoard";
import { SkillTileInfo } from "./skillTile";
import { SkillsSectionElement } from "./styles";

export interface SkillCategoryRoot extends SkillTileInfo {
	content: SkillCategory[];
}

const categoryIcons = [FrontendIcon, BackendIcon, EmbeddedIcon];

export const SkillsSection: FC = () => {
	const [t] = useTranslation("indexPage");

	const categoryRoots = t<SkillCategoryRoot[]>("skills.categoryRoots", {
		returnObjects: true
	});

	const categoryRootsWithIcons = categoryRoots.map((category, index) => ({
		...category,
		icon: categoryIcons[index]
	}));

	return (
		<SkillsSectionElement id={t("skills.sectionId")}>
			<SectionHeader
				sectionName={t("skills.sectionName")}
				description={t("skills.sectionDescription")}
			/>
			<MobileSkillsSection categoryRoots={categoryRootsWithIcons} />
		</SkillsSectionElement>
	);
};
