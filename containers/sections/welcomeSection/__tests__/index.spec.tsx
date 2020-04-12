jest.mock("~/utils/i18next");

import { WelcomeSection } from "..";
import { shallow } from "enzyme";
import { useTranslationMock } from "~/tests/utils/useTranslationMock";
import { Header } from "~/components/sections/welcomeSection/header";
import { DeveloperPicture } from "~/components/sections/welcomeSection/developerPicture";
import { AboutMe } from "~/components/sections/welcomeSection/aboutMe";

describe(WelcomeSection, () => {
	it("should match snapshot", () => {
		useTranslationMock("welcome", {
			name: "Bartek Banach",
			specialization: "Full Stack Developer",
			aboutMe: "This is some description about me"
		});

		const result = shallow(<WelcomeSection />);

		expect(result).toMatchSnapshot();
	});

	it("should match snapshot", () => {
		useTranslationMock("welcome", {
			name: "Bartek Banach",
			specialization: "Full Stack Developer",
			aboutMe: "This is some description about me"
		});

		const rendered = shallow(<WelcomeSection />);
		const result = rendered.containsAllMatchingElements([
			<Header key="1" name="Bartek Banach" specialization="Full Stack Developer" />,
			<DeveloperPicture key="2" />,
			<AboutMe key="3" content="This is some description about me" />
		]);

		expect(result).toBeTruthy();
	});
});
