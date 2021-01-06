import React, { FC } from "react";

import { useTranslation } from "~/utils/i18next";

import DeveloperPictureSVG from "~/public/assets/pages/index/welcome/developerPicture.svg";

import {
	AboutMe,
	DeveloperPictureWrapper,
	HeadersWrapper,
	MainHeader,
	Profession,
	WelcomeSectionContentWrapper
} from "./styles";

export const TitleWithGradient: FC = ({ children }) => (
	<svg width="100%" viewBox="0 0 222 23">
		<defs>
			<linearGradient
				id="welcomeSectionTitleGradientSetup"
				x1="0"
				x2="0"
				y1="0"
				y2="100%"
				gradientUnits="userSpaceOnUse"
			>
				<stop stopColor="#4764e6" offset="0%" />
				<stop stopColor="#694fff" offset="100%" />
			</linearGradient>
		</defs>
		<text x="-2.1" y="22.8" fill="url(#welcomeSectionTitleGradientSetup)">
			{children}
		</text>
	</svg>
);

export const SubTitleElement: FC = ({ children }) => (
	<svg width="65%" viewBox="0 0 222 23">
		<text x="-2.1" y="18">
			{children}
		</text>
	</svg>
);

export const DesktopWelcomeSectionContent: FC = () => {
	const [t] = useTranslation("indexPage");

	return (
		<WelcomeSectionContentWrapper>
			<HeadersWrapper>
				<MainHeader>
					<TitleWithGradient>{t("welcome.desktop.title")}</TitleWithGradient>
				</MainHeader>
				<Profession>
					<SubTitleElement>{t("welcome.desktop.subTitle")}</SubTitleElement>
				</Profession>
			</HeadersWrapper>
			<DeveloperPictureWrapper>
				<DeveloperPictureSVG />
			</DeveloperPictureWrapper>
			<AboutMe dangerouslySetInnerHTML={{ __html: t("welcome.desktop.aboutMe") }} />
		</WelcomeSectionContentWrapper>
	);
};
