import { environment } from "../actions";
import { environmentReducer } from "../reducer";

describe("environmentReducer.runningInBrowser", () => {
	it("should change state to true after environment runningEnvironmentChanged action", () => {
		const initialState = false;
		const action = environment.runningEnvironmentChanged();

		const result = environmentReducer.runningInBrowser(initialState, action);

		expect(result).toBe(true);
	});
});
