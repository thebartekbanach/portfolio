import { configureStore } from "../configureStore";
import { environment } from "../environment";
import { isRunningInBrowserSelector } from "../environment/selectors";

describe("environment integration tests", () => {
	it("should set initial state of isRunningInBrowser to false", () => {
		const store = configureStore(undefined as any, { isServer: false });

		const result = isRunningInBrowserSelector(store.getState());

		expect(result).toBe(false);
	});

	it("should change state to true after environment runningEnvironmentChanged action", () => {
		const store = configureStore(undefined as any, { isServer: false });
		const action = environment.actions.runningEnvironmentChanged();

		store.dispatch(action);
		const result = isRunningInBrowserSelector(store.getState());

		expect(result).toBe(true);
	});
});
