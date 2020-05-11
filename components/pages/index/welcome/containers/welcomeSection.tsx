import { Navbar } from "~/components/shared/navbar/containers/navbar";
import { Section } from "~/components/shared/layout/components/section";
import { Header } from "~/components/pages/index/welcome/components/header";
import { WelcomeSection as WelcomeSectionContainer } from "~/components/pages/index/welcome/components/container";
import { AboutMe } from "~/components/pages/index/welcome/components/aboutMe";
import { DeveloperPicture } from "~/components/pages/index/welcome/components/developerPicture";
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
