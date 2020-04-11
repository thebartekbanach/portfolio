import { Navbar } from "~/containers/Navbar";
import { Section } from "~/components/shared/layout/section";
import { Header } from "~/components/sections/welcomeSection/header";
import {
	WelcomeSectionContentContainer,
	WelcomeSectionContent
} from "~/components/sections/welcomeSection/container";
import { AboutMe } from "~/components/sections/welcomeSection/aboutMe";
import { DeveloperPicture } from "~/components/sections/welcomeSection/developerPicture";

export const WelcomeSection = () => {
	const aboutMe = `
		Jestem <b>20 letnim</b> w pełni samodzielnym <b>pasjonatem web developmentu</b>.
		<b>Kocham automatyzować zadania, ułatwiać pracę ludziom</b> nie tylko
		za pomocą aplikacji internetowych ale także za pomocą intuicyjnych
		systemów typu embedded. Lubię też <b>tworzyć proste, intuicyjne
		aplikacje frontendowe</b>, które są proste w użyciu oraz przydatne w codziennym życiu.
	`;

	return (
		<Section>
			<Navbar />
			<WelcomeSectionContentContainer>
				<WelcomeSectionContent>
					<Header name="Bartek Banach" specialization="Full Stack Developer" />
					<DeveloperPicture />
					<AboutMe content={aboutMe} />
				</WelcomeSectionContent>
			</WelcomeSectionContentContainer>
		</Section>
	);
};
