import { configureStore } from "../configureStore";
import { environment } from "../environment";

describe("environment integration tests", () => {
	it("should set initial state of isRunningInBrowser to false", () => {
		const store = configureStore(undefined as any, { isServer: true });

		const result = environment.selectors.isRunningInBrowser(store.getState());

		expect(result).toBe(false);
	});

	it("should change state to true after environment runningEnvironmentChanged action", () => {
		const store = configureStore(undefined as any, { isServer: false });
		const action = environment.actions.runningEnvironmentChanged();

		store.dispatch(action);
		const result = environment.selectors.isRunningInBrowser(store.getState());

		expect(result).toBe(true);
	});
});
