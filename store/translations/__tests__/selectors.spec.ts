import { Store } from "~/store";
import { DeepPartial } from "redux";
import { isPageHidden, areAllTranslationProvidersReady } from "../selectors";

describe("translations state selectors", () => {
	describe("isPageHiddenSelector", () => {
		it("should return true if languages.pageState is equal to 'hidden'", () => {
			const state: DeepPartial<Store> = { translations: { pageState: "hidden" } };

			const result = isPageHidden(state as Store);

			expect(result).toBe(true);
		});

		it("should return false if languages.pageState is equal to 'hiding'", () => {
			const state: DeepPartial<Store> = { translations: { pageState: "hiding" } };

			const result = isPageHidden(state as Store);

			expect(result).toBe(false);
		});

		it("should return false if languages.pageState is equal to 'shown'", () => {
			const state: DeepPartial<Store> = { translations: { pageState: "shown" } };

			const result = isPageHidden(state as Store);

			expect(result).toBe(false);
		});
	});

	describe("areAllTranslationProvidersReady", () => {
		it("should return true if every translation provider is ready", () => {
			const state: DeepPartial<Store> = {
				translations: {
					loadingState: {
						page: true,
						contact: true
					}
				}
			};

			const result = areAllTranslationProvidersReady(state as Store);

			expect(result).toBe(true);
		});

		it("should return false if any translation provider is not ready", () => {
			const state: DeepPartial<Store> = {
				translations: {
					loadingState: {
						page: true,
						realizations: false,
						contact: true
					}
				}
			};

			const result = areAllTranslationProvidersReady(state as Store);

			expect(result).toBe(false);
		});
	});
});
