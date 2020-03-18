import { Store } from "~/store";
import { isRunningInBrowser, isRunningOnServer, runningEnvironment } from "../selectors";

describe("environment state selectors", () => {
	describe("runningEnvironment", () => {
		it("should return 'server' if running on server", () => {
			const state: Partial<Store> = { environment: { runningInBrowser: false } };

			const result = runningEnvironment(state as Store);

			expect(result).toEqual("server");
		});

		it("should return 'browser' if running in browser", () => {
			const state: Partial<Store> = { environment: { runningInBrowser: true } };

			const result = runningEnvironment(state as Store);

			expect(result).toEqual("browser");
		});
	});

	describe("isRunningInBrowser", () => {
		it("should return true if environment.runningInBrowser is equal to true", () => {
			const state: Partial<Store> = { environment: { runningInBrowser: true } };

			const result = isRunningInBrowser(state as Store);

			expect(result).toBe(true);
		});

		it("should return false if environment.runningInBrowser is equal to false", () => {
			const state: Partial<Store> = { environment: { runningInBrowser: false } };

			const result = isRunningInBrowser(state as Store);

			expect(result).toBe(false);
		});
	});

	describe("isRunningOnServer", () => {
		it("should return true if environment.runningInBrowser is equal to false", () => {
			const state: Partial<Store> = { environment: { runningInBrowser: false } };

			const result = isRunningOnServer(state as Store);

			expect(result).toBe(true);
		});

		it("should return false if environment.runningInBrowser is equal to true", () => {
			const state: Partial<Store> = { environment: { runningInBrowser: true } };

			const result = isRunningOnServer(state as Store);

			expect(result).toBe(false);
		});
	});
});
