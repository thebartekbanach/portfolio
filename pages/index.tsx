import { NextPage } from "next";
import { Main } from "~/components/shared/layout/main";
import { WelcomeSection } from "~/containers/sections/welcomeSection";

const Index: NextPage = () => (
	<Main>
		<WelcomeSection />
	</Main>
);

export default Index;
