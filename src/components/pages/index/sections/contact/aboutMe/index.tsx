import React, { FC } from "react";

import { useTranslation } from "~/utils/i18next";

import FacebookLogo from "~/public/assets/pages/index/contact/socials/facebook-logo.svg";
import GithubLogo from "~/public/assets/pages/index/contact/socials/github-logo.svg";

import {
	AboutMeTile,
	ProfilePictureWrapper,
	MyName,
	ContactEmail,
	AboutMeText,
	SocialsWrapper,
	SocialLink,
	MobileOpenContactFormButton
} from "./styles";

interface AboutMeProps {
	onContactFormExpandToggle: () => void;
}

export const AboutMe: FC<AboutMeProps> = ({ onContactFormExpandToggle }) => {
	const [t] = useTranslation("indexPage");

	return (
		<AboutMeTile>
			<ProfilePictureWrapper>
				<img src={t("contact.aboutMeTile.profilePictureUrl")} />
			</ProfilePictureWrapper>
			<MyName>{t("contact.aboutMeTile.myName")}</MyName>
			<AboutMeText>{t("contact.aboutMeTile.aboutMeText")}</AboutMeText>
			<SocialsWrapper>
				<SocialLink href={t("socials:github")}>
					<GithubLogo />
				</SocialLink>
				<SocialLink href={t("socials:facebook")}>
					<FacebookLogo />
				</SocialLink>
			</SocialsWrapper>
			<MobileOpenContactFormButton onClick={onContactFormExpandToggle}>
				{t("contact.aboutMeTile.writeToMeButton")}
			</MobileOpenContactFormButton>
		</AboutMeTile>
	);
};
