import { FC } from "react";

import { useTranslation } from "~/utils/i18next";
import { scrollToElement } from "~/utils/scrollToElement";

import {
	AboutMeTextWrapper,
	FindOutMoreButton,
	FindOutMoreButtonWrapper,
	HelloTextWrapper,
	MobileWelcomeSectionWrapper,
	MyNameWrapper
} from "./styles";

interface ScalableTextElementProps {
	viewBox: string;
	text: string;
}

// example viewBox="0 0 145 23"
const HelloTextElement: FC<ScalableTextElementProps> = ({ text, viewBox }) => (
	<svg width="100%" viewBox={viewBox}>
		<text x="0" y="18">
			{text}
		</text>
	</svg>
);

// example viewBox="0 0 127 13"
const MyNameElement: FC<ScalableTextElementProps> = ({ text, viewBox }) => (
	<svg width="100%" viewBox={viewBox}>
		<defs>
			<linearGradient
				id="welcomeSectionTitleGradientSetup"
				x1="0"
				x2="0"
				y1="0"
				y2="100%"
				gradientUnits="userSpaceOnUse"
			>
				<stop stopColor="#694fff" offset="0%" />
				<stop stopColor="#4764e6" offset="100%" />
			</linearGradient>
		</defs>
		<text x="0" y="13" fill="url(#welcomeSectionTitleGradientSetup)">
			{text}
		</text>
	</svg>
);

export const MobileWelcomeSectionContent: FC = () => {
	const [t] = useTranslation("pages.index");

	const skillsSectionId = `#${t("skills.sectionId")}`;
	const skillsSectionUrl = `/${skillsSectionId}`;

	const onFindOutMoreButtonClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
		e.preventDefault();

		const skillsSection = document.querySelector(skillsSectionId);

		if (skillsSection === null) {
			throw new Error("Cannot scroll to skills section because section element is null");
		}

		scrollToElement(skillsSection);
	};

	return (
		<MobileWelcomeSectionWrapper>
			<HelloTextWrapper>
				<HelloTextElement
					text={t("welcome.mobile.helloText")}
					viewBox={t("welcome.mobile.helloTextViewBox")}
				/>
			</HelloTextWrapper>
			<MyNameWrapper>
				<MyNameElement
					text={t("welcome.mobile.myNameText")}
					viewBox={t("welcome.mobile.myNameTextViewBox")}
				/>
			</MyNameWrapper>
			<AboutMeTextWrapper dangerouslySetInnerHTML={{ __html: t("welcome.mobile.aboutMe") }} />
			<FindOutMoreButtonWrapper>
				<FindOutMoreButton href={skillsSectionUrl} onClick={onFindOutMoreButtonClick}>
					{t("welcome.mobile.findOutMoreButtonText")}
				</FindOutMoreButton>
			</FindOutMoreButtonWrapper>
		</MobileWelcomeSectionWrapper>
	);
};
