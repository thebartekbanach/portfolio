import React, { FC, useEffect, useState } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import useIsInViewport from "use-is-in-viewport";

import { HorizontalReplacementContainer } from "~/components/shared/horizontalReplacementContainer";
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
	MobileOpenContactFormButton,
	MobileOpenContactFormButtonArrow
} from "./styles";

interface AboutMeProps {
	isContactFormExpandedOnMobile: boolean;
	onContactFormExpandToggle: () => void;
}

export const AboutMe: FC<AboutMeProps> = ({
	isContactFormExpandedOnMobile,
	onContactFormExpandToggle
}) => {
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

	const openContactFormButtonContent = isContactFormExpandedOnMobile ? (
		<MobileOpenContactFormButtonArrow key="arrow" />
	) : (
		<span key="text">{t("contact.aboutMeTile.writeToMeButton")}</span>
	);

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
				<HorizontalReplacementContainer>
					{openContactFormButtonContent}
				</HorizontalReplacementContainer>
			</MobileOpenContactFormButton>
		</AboutMeTile>
	);
};
