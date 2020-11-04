import { PageHead } from "~/components/layout/head";
import { PageContainer } from "~/components/layout/pageContainer";
import { WelcomeSection } from "~/components/pages/index/sections/welcome";

const IndexPage = () => {
	return (
		<>
			<PageHead pageTitle="Bartek Banach - portfolio" description="TODO" />
			<PageContainer>
				<WelcomeSection />
			</PageContainer>
		</>
	);
};

export default IndexPage;
