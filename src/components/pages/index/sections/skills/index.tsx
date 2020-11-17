import isMobile from "ismobilejs";
import React, { FC } from "react";

import { SectionHeader } from "~/components/shared/sectionHeader";
import { useMatchMedia } from "~/hooks/useMatchMedia";
import { useTranslation } from "~/utils/i18next";

import BackendIcon from "~/public/assets/pages/index/skills/categories/backend/category-icon.svg";
import EmbeddedIcon from "~/public/assets/pages/index/skills/categories/embedded/category-icon.svg";
import FrontendIcon from "~/public/assets/pages/index/skills/categories/frontend/category-icon.svg";

import { DesktopSkillsSection } from "./desktopSkillsSection";
import { MobileSkillsSection } from "./mobileSkillsSection";
import { SkillCategory } from "./skillBoard";
import { SkillTileInfo } from "./skillTile";
import { SkillsSectionElement } from "./styles";

const useMatchesDesktopDevices = (userAgent: string) => {
	const isMobileResult = isMobile(userAgent);
	const isDesktop = !isMobileResult.phone && !isMobileResult.tablet;

	return useMatchMedia("(min-width: 1000px)", isDesktop);
};

export interface SkillCategoryRoot extends SkillTileInfo {
	content: SkillCategory[];
}

const categoryIcons = [FrontendIcon, BackendIcon, EmbeddedIcon];

interface SkillsSectionProps {
	userAgent: string; // for server side rendering, to match mobile or desktop version of skills section
}

export const SkillsSection: FC<SkillsSectionProps> = ({ userAgent }) => {
	const [t] = useTranslation("indexPage");

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
