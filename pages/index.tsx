import { NextPage } from "next";
import { Main } from "~/components/shared/layout/components/main";
import { WelcomeSection } from "~/components/pages/index/welcome/containers/welcomeSection";
import { SkillsSection } from "~/components/pages/index/skills/containers/skillsSection";
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
