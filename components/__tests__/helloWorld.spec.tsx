import { HelloWorldComponent } from "../helloWorld";
import { shallow } from "enzyme";
import { HelloWorldStyled } from "../helloWorld.styles";

describe("HelloWorldComponent", () => {
	it("should render Hello world! string", () => {
		const result = shallow(<HelloWorldComponent />);
		expect(result.find(HelloWorldStyled).text()).toBe("Hello world!");
	});
});
