import { PageHead } from "~/components/layout/head";
import { PageContainer } from "~/components/layout/pageContainer";
import { SkillsSection } from "~/components/pages/index/sections/skills";
import { WelcomeSection } from "~/components/pages/index/sections/welcome";

const IndexPage = () => {
	return (
		<>
			<PageHead pageTitle="Bartek Banach - portfolio" description="TODO" />
			<PageContainer>
				<WelcomeSection />
				<SkillsSection />
			</PageContainer>
		</>
	);
};

export default IndexPage;
