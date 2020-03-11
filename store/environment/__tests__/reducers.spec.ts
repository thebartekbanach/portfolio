import { environment } from "..";
import { environmentReducer } from "../reducers";

describe("environmentReducer.runningInBrowser", () => {
	it("should change state to true after environment runningEnvironmentChanged action", () => {
		const initialState = false;
		const action = environment.actions.runningEnvironmentChanged();

		const result = environmentReducer.runningInBrowser(initialState, action);

		expect(result).toBe(true);
	});
});
