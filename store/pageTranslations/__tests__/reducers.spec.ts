import { pageTranslationsReducers } from "../reducers";
import { pageTranslations } from "..";
import { AvailablePageTranslations } from "../models";

describe("pageTranslations reducers", () => {
	describe("availablePageTranslations", () => {
		it("should add page translations correctly", () => {
			const initialState: AvailablePageTranslations = {};
			const action = pageTranslations.actions.pageTranslationsFetched("pl", {
				example: 1
			} as any);

			const result = pageTranslationsReducers.availablePageTranslations(initialState, action);

			expect(result).toEqual({ pl: { example: 1 } });
		});

		it("should correctly add more page translations", () => {
			const initialState: AvailablePageTranslations = {
				en: { example: 1 } as any
			};
			const action = pageTranslations.actions.pageTranslationsFetched("pl", {
				example: 2
			} as any);

			const result = pageTranslationsReducers.availablePageTranslations(initialState, action);

			expect(result).toEqual({
				en: { example: 1 },
				pl: { example: 2 }
			});
		});
	});
});
