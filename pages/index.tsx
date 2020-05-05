import { NextPage } from "next";
import { Main } from "~/components/shared/layout/main";
import { WelcomeSection } from "~/containers/sections/welcomeSection";
import { SkillsSection } from "~/containers/sections/skillsSection";

const Index: NextPage = () => (
	<Main>
		<WelcomeSection />
		<SkillsSection />
	</Main>
);

export default Index;
