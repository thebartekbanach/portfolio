import { Store } from "~/store";
import { DeepPartial } from "redux";
import {
	isPageHidden,
	areAllTranslationProvidersReady,
	availableLanguages,
	currentLanguageCode
} from "../selectors";

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

	describe("availableLanguages", () => {
		it("should return correct availableLanguages array", () => {
			const state: DeepPartial<Store> = {
				translations: {
					availableLanguages: [
						{ code: "pl", name: "Polski" },
						{ code: "en", name: "English" }
					]
				}
			};

			const result = availableLanguages(state as Store);

			expect(result).toBe(state.translations?.availableLanguages);
		});
	});

	describe("currentLanguageCode", () => {
		it("should return currentLanguageCode", () => {
			const state: DeepPartial<Store> = {
				translations: {
					currentLanguageCode: "ok"
				}
			};

			const result = currentLanguageCode(state as Store);

			expect(result).toEqual("ok");
		});
	});
});
