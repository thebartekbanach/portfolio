import React, { FC } from "react";

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

export const AboutMe: FC = () => {
	return (
		<AboutMeTile>
			<ProfilePictureWrapper>
				<img src="/assets/pages/index/contact/profile-picture.jpg" />
			</ProfilePictureWrapper>
			<MyName>Bartłomiej Banach</MyName>
			<AboutMeText>
				Pasjonat web developmentu. Kocha automatyzować zadania, ułatwiać pracę ludziom nie
				tylko za pomocą aplikacji internetowych ale także za pomocą intuicyjnych systemów
				typu embedded.
			</AboutMeText>
			<SocialsWrapper>
				<SocialLink href="#">
					<GithubLogo />
				</SocialLink>
				<SocialLink href="#">
					<FacebookLogo />
				</SocialLink>
			</SocialsWrapper>
			<MobileOpenContactFormButton>Napisz do mnie</MobileOpenContactFormButton>
		</AboutMeTile>
	);
};
