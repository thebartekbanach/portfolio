import { Navbar } from "~/containers/shared/navbar";
import { Section } from "~/components/shared/layout/section";
import { Header } from "~/components/sections/welcomeSection/header";
import { WelcomeSection as WelcomeSectionContainer } from "~/components/sections/welcomeSection/container";
import { AboutMe } from "~/components/sections/welcomeSection/aboutMe";
import { DeveloperPicture } from "~/components/sections/welcomeSection/developerPicture";
import { useTranslation } from "~/utils/i18next";

export const WelcomeSection = () => {
	const { t } = useTranslation("welcome");

	return (
		<Section isFirstSection>
			<Navbar />
			<WelcomeSectionContainer>
				<Header name={t("name")} specialization={t("specialization")} />
				<DeveloperPicture />
				<AboutMe content={t("aboutMe")} />
			</WelcomeSectionContainer>
		</Section>
	);
};
