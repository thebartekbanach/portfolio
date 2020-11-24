import React, { FC } from "react";

import { useTranslation } from "~/utils/i18next";

import FacebookLogo from "~/public/assets/pages/index/contact/socials/facebook-logo.svg";
import GithubLogo from "~/public/assets/pages/index/contact/socials/github-logo.svg";

import {
	AboutMeTile,
	ProfilePictureWrapper,
	MyName,
	AboutMeText,
	SocialsWrapper,
	SocialLink,
	MobileOpenContactFormButton
} from "./styles";

interface AboutMeProps {
	onContactFormExpandToggle: () => void;
}

// TODO: add lazy loading of profile picture
// TODO: MobileOpenContactFormButton content should change from "Write to me" to "/\" when contact form is expanded
// TODO: github and facebook icons should be gray and should change grayscale to color when user hovers over it
// TODO: remove or change the shape of outline
// TODO: validation, errors, backend, blacklist

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
