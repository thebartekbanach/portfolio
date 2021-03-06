import React, { FC } from "react";

import { SectionHeader } from "~/components/shared/sectionHeader";
import { useMatchesDesktopDevices } from "~/hooks/useMatchesDesktopDevices";
import { useTranslation } from "~/utils/i18next";

import BackendIcon from "~/public/assets/pages/index/skills/categories/backend/category-icon.svg";
import EmbeddedIcon from "~/public/assets/pages/index/skills/categories/embedded/category-icon.svg";
import FrontendIcon from "~/public/assets/pages/index/skills/categories/frontend/category-icon.svg";

import { DesktopSkillsSection } from "./desktopSkillsSection";
import { MobileSkillsSection } from "./mobileSkillsSection";
import { SkillCategory } from "./skillBoard";
import { SkillTileInfo } from "./skillTile";
import { SkillsSectionElement } from "./styles";

export interface SkillCategoryRoot extends SkillTileInfo {
	content: SkillCategory[];
}

const categoryIcons = [FrontendIcon, BackendIcon, EmbeddedIcon];

interface SkillsSectionProps {
	userAgent: string; // for server side rendering, to match mobile or desktop version of skills section
}

export const SkillsSection: FC<SkillsSectionProps> = ({ userAgent }) => {
	const [t] = useTranslation("pages.index");

	const matchesDesktopDevices = useMatchesDesktopDevices(userAgent);

	const categoryRoots = t<SkillCategoryRoot[]>("skills.categoryRoots", {
		returnObjects: true
	});

	const categoryRootsWithIcons = categoryRoots.map((category, index) => ({
		...category,
		icon: categoryIcons[index]
	}));

	const SkillsSectionContent = matchesDesktopDevices ? DesktopSkillsSection : MobileSkillsSection;

	return (
		<SkillsSectionElement id={t("skills.sectionId")}>
			<SectionHeader
				sectionName={t("skills.sectionName")}
				description={t("skills.sectionDescription")}
			/>
			<SkillsSectionContent categoryRoots={categoryRootsWithIcons} />
		</SkillsSectionElement>
	);
};
