import { useTranslation } from "~/utils/i18next";

import DeveloperPictureSVG from "~/public/assets/pages/index/welcome/developerPicture.svg";

import { SubTitleElement } from "./components/subTitleElement";
import { TitleWithGradient } from "./components/titleWithGradient";
import {
	AboutMe,
	DeveloperPictureWrapper,
	Profession,
	MainHeader,
	HeadersWrapper,
	WelcomeSectionContentWrapper,
	WelcomeSectionWrapper
} from "./styles";

export const WelcomeSection = () => {
	const [t] = useTranslation("indexPage");

	return (
		<WelcomeSectionWrapper>
			<WelcomeSectionContentWrapper>
				<HeadersWrapper>
					<MainHeader>
						<TitleWithGradient text={t("welcome.title")} />
					</MainHeader>
					<Profession>
						<SubTitleElement text={t("welcome.subTitle")} />
					</Profession>
				</HeadersWrapper>
				<DeveloperPictureWrapper>
					<DeveloperPictureSVG />
				</DeveloperPictureWrapper>
				<AboutMe dangerouslySetInnerHTML={{ __html: t("welcome.aboutMe") }} />
			</WelcomeSectionContentWrapper>
		</WelcomeSectionWrapper>
	);
};
