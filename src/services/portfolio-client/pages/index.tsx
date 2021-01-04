import { NextPage } from "next";

import { PageHead } from "~/components/layout/head";
import { PageContainer } from "~/components/layout/pageContainer";
import { ContactSection } from "~/components/pages/index/sections/contact";
import { GithubSection } from "~/components/pages/index/sections/github";
import { RealizationsSection } from "~/components/pages/index/sections/realizations";
import { SkillsSection } from "~/components/pages/index/sections/skills";
import { WelcomeSection } from "~/components/pages/index/sections/welcome";

interface IndexPageProps {
	userAgent: string;
}

const IndexPage: NextPage<IndexPageProps> = ({ userAgent }) => {
	return (
		<>
			<PageHead pageTitle="Bartek Banach - portfolio" description="TODO" />
			<PageContainer>
				<WelcomeSection />
				<SkillsSection userAgent={userAgent} />
				<GithubSection />
				<RealizationsSection />
				<ContactSection userAgent={userAgent} />
			</PageContainer>
		</>
	);
};

IndexPage.getInitialProps = async ({ req }) => {
	let userAgent =
		typeof window === "undefined" ? req?.headers["user-agent"] : window.navigator.userAgent;

	if (userAgent === undefined) {
		userAgent = "unknown";
	}

	return { userAgent };
};

export default IndexPage;
