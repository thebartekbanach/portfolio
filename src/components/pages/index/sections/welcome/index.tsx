import { useTranslation } from "~/utils/i18next";
import {
	AboutMe,
	DeveloperPictureWrapper,
	Profession,
	MainHeader,
	HeadersWrapper,
	WelcomeSectionContentWrapper,
	WelcomeSectionWrapper
} from "./styles";

import DeveloperPictureSVG from "../../../../../public/assets/pages/index/welcome/developerPicture.svg";
import { SubTitleElement } from "./components/subTitleElement";
import { TitleWithGradient } from "./components/titleWithGradient";

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
