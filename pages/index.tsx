import { HelloWorldComponent } from "../components/helloWorld";
import { SomeContainer } from "~/containers/SomeContainer";
import { NextPage } from "next";
import { Navbar } from "~/containers/Navbar";
import { Main } from "~/components/shared/layout/main";
import { Section } from "~/components/shared/layout/section";
import { WelcomeSection } from "~/containers/sections/welcomeSection";

const Index: NextPage = () => (
	<Main>
		<WelcomeSection />
	</Main>
);

export default Index;
