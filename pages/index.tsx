import { NextPage } from "next";
import { Main } from "~/components/shared/layout/main";
import { WelcomeSection } from "~/containers/sections/welcomeSection";
import { SkillsSection } from "~/containers/sections/skillsSection";
import { dispatchAndWaitForResult } from "~/utils/dispatchAndWaitForResult";
import { skills } from "~/store/skills";

const Index: NextPage = () => (
	<Main>
		<WelcomeSection />
		<SkillsSection />
	</Main>
);

Index.getInitialProps = async ctx => {
	await dispatchAndWaitForResult(
		ctx.store,
		skills.actions.setupSkillsSection(),
		skills.selectors.areBoardsContentsInitialized
	);

	return {};
};

export default Index;
