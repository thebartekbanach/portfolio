import { DeepPartial } from "redux";
import { Store } from "~/store";
import { pageTranslations } from "..";

describe("pageTranslations selectors", () => {
	describe("availablePageTranslations", () => {
		it("should return available page translations object", () => {
			const state: DeepPartial<Store> = {
				pageTranslations: {
					availablePageTranslations: {
						en: { example: 1 } as any
					}
				}
			};

			const result = pageTranslations.selectors.availablePageTranslations(state as Store);

			expect(result).toEqual({
				en: { example: 1 }
			});
		});
	});

	describe("currentPageTranslations", () => {
		it("should return current page translations depending on currentLanguageCode", () => {
			const state: DeepPartial<Store> = {
				translations: {
					currentLanguageCode: "pl"
				},
				pageTranslations: {
					availablePageTranslations: {
						en: { example: 1 } as any,
						pl: { example: 2 } as any
					}
				}
			};

			const result = pageTranslations.selectors.currentPageTranslation(state as Store);

			expect(result).toEqual({ example: 2 });
		});
	});
});
