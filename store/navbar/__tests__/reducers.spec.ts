import { mobileNavbarOpenState } from "../reducers";
import { navbar } from "..";

describe(mobileNavbarOpenState, () => {
	it("should toggle state to true", () => {
		const state = false;
		const action = navbar.actions.internal.setMenuState(true);

		const result = mobileNavbarOpenState(state, action);

		expect(result).toBe(true);
	});

	it("should toggle state to false", () => {
		const state = true;
		const action = navbar.actions.internal.setMenuState(false);

		const result = mobileNavbarOpenState(state, action);

		expect(result).toBe(false);
	});
});
