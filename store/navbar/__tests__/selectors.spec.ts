import { isMobileNavbarOpen } from "../selectors";
import { DeepPartial } from "redux";
import { State } from "~/store";

describe(isMobileNavbarOpen, () => {
	it("should return correct value", () => {
		const state: DeepPartial<State> = {
			navbar: {
				mobileNavbarOpenState: true
			}
		};

		const result = isMobileNavbarOpen(state as State);

		expect(result).toBe(true);
	});
});
