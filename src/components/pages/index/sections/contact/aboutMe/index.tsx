import React, { FC, useEffect, useState } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import useIsInViewport from "use-is-in-viewport";

import { useTranslation } from "~/utils/i18next";
import { loadImage } from "~/utils/loadImage";

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

// TODO: MobileOpenContactFormButton content should change from "Write to me" to "/\" when contact form is expanded
// TODO: remove or change the shape of outline
// TODO: validation, errors, backend, blacklist

export const AboutMe: FC<AboutMeProps> = ({ onContactFormExpandToggle }) => {
	const [t] = useTranslation("indexPage");
	const [isSectionInViewport, tileRef] = useIsInViewport();
	const [isProfilePictureLoaded, setIsProfilePictureLoaded] = useState(false);

	const profilePictureUrl = t("contact.aboutMeTile.profilePictureUrl");
	const profilePictureImage = !isProfilePictureLoaded ? <div /> : <img src={profilePictureUrl} />;

	useEffect(() => {
		if (!isProfilePictureLoaded && isSectionInViewport) {
			loadImage(profilePictureUrl).then(() => setIsProfilePictureLoaded(true));
		}
	}, [isSectionInViewport]);

	return (
		<AboutMeTile ref={tileRef}>
			<ProfilePictureWrapper>
				<SwitchTransition mode="in-out">
					<CSSTransition
						key={isProfilePictureLoaded ? "image" : "preloader"}
						timeout={500}
					>
						{profilePictureImage}
					</CSSTransition>
				</SwitchTransition>
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
