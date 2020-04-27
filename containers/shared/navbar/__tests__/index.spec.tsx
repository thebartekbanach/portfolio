jest.mock("~/utils/i18next");

import { Navbar } from "~/containers/shared/navbar";
import { useTranslationMock } from "~/tests/utils/useTranslationMock";
import { mountWithRedux, FakeStore } from "~/tests/utils/mountWithRedux";

describe(Navbar, () => {
	it("should match snapshot", () => {
		useTranslationMock("navbar", {
			"logo.rootPath": "/dev/",
			"logo.userName": "BartekBanach",
			navbarItems: [
				{
					id: 1,
					url: "#skills",
					content: "Skills"
				},
				{
					id: 2,
					url: "#realizations",
					content: "Realizations"
				},
				{
					id: 3,
					url: "#contact",
					content: "Contact"
				}
			],
			contactButtonContent: "Write to me"
		});

		const store = new FakeStore({
			navbar: {
				mobileNavbarOpenState: false
			}
		});

		const result = mountWithRedux(store, <Navbar />);

		expect(result).toMatchSnapshot();
	});

	it("should render correctly", () => {});
});
