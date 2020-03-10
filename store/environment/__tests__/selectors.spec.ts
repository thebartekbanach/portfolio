import { isRunningInBrowserSelector, isRunningOnServerSelector, runningEnvironmentSelector } from "../selectors";
import { Store } from "~/store";

describe("environment state selectors", () => {
	describe("runningEnvironmentSelector", () => {
		it("should return 'server' if running on server", () => {
			const state: Partial<Store> = { environment: { runningInBrowser: false } };

			const result = runningEnvironmentSelector(state as Store);

			expect(result).toEqual("server");
		});

		it("should return 'browser' if running in browser", () => {
			const state: Partial<Store> = { environment: { runningInBrowser: true } };

			const result = runningEnvironmentSelector(state as Store);

			expect(result).toEqual("browser");
		});
	});

	describe("isRunningInBrowserSelector", () => {
		it("should return true if environment.runningInBrowser is equal to true", () => {
			const state: Partial<Store> = { environment: { runningInBrowser: true } };

			const result = isRunningInBrowserSelector(state as Store);

			expect(result).toBe(true);
		});
	});

	describe("isRunningOnServerSelector", () => {
		it("should return true if environment.runningInBrowser is equal to false", () => {
			const state: Partial<Store> = { environment: { runningInBrowser: false } };

			const result = isRunningOnServerSelector(state as Store);

			expect(result).toBe(true);
		});
	});
});
