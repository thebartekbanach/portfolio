import { HelloWorldComponent } from "../components/helloWorld";
import { SomeContainer } from "~/containers/SomeContainer";
import { NextPage } from "next";

const Index: NextPage = () => (
	<>
		<HelloWorldComponent />
		<SomeContainer />
	</>
);

Index.getInitialProps = () => ({
	namespacesRequired: ["common"]
});

export default Index;
