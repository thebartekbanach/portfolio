import { createMock } from "ts-auto-mock";
import { expectSaga } from "redux-saga-test-plan";
import * as matchers from "redux-saga-test-plan/matchers";
import * as providers from "~/tests/utils/testEffectsProviders";
import { race } from "~/lib/sagaEffects";
import { loadPageTranslation } from "../sagas";
import { pageContentsApi } from "~/lib/api/contentFetchers/page/contents";
import { PageTranslations } from "../models";
import { translations } from "~/store/translations";
import { pageTranslations } from "..";

describe("pageTranslations sagas", () => {
	describe("loadPageTranslation", () => {
		it("should correctly fetch and set language", () => {
			const fakeTranslations = createMock<PageTranslations>();
			const action = translations.actions.setLanguage.request("pl");
			const mock = jest
				.fn()
				.mockReturnValue({ contents: fakeTranslations, providerError: undefined });

			return expectSaga(loadPageTranslation, action)
				.provide([
					providers
						.race({
							contents: race.call(pageContentsApi.fetchPageContents, "pl"),
							providerError: race.take(translations.actions.setLanguage.failed.type)
						})
						.mockedBy(mock)
				])
				.race({
					contents: race.call(pageContentsApi.fetchPageContents, "pl"),
					providerError: race.take(translations.actions.setLanguage.failed.type)
				})
				.put(pageTranslations.actions.pageTranslationsFetched("pl", fakeTranslations))
				.put(translations.actions.translationProviderReady("page"))
				.run();
		});

		it("should put setLanguage.failed action after fetch error", () => {
			const action = translations.actions.setLanguage.request("pl");
			const mock = jest.fn().mockImplementation(() => {
				throw new Error("error");
			});

			return expectSaga(loadPageTranslation, action)
				.provide([
					providers
						.race({
							contents: race.call(pageContentsApi.fetchPageContents, "pl"),
							providerError: race.take(translations.actions.setLanguage.failed.type)
						})
						.mockedBy(mock)
				])
				.race({
					contents: race.call(pageContentsApi.fetchPageContents, "pl"),
					providerError: race.take(translations.actions.setLanguage.failed.type)
				})
				.put(
					translations.actions.setLanguage.failed("pl", {
						from: "translation-provider",
						translationProviderId: "page",
						error: new Error("error")
					})
				)
				.not.put(translations.actions.translationProviderReady("page"))
				.run();
		});

		it("should not put pageTranslationsFetched action after setLanguage.failed action occur", () => {
			const action = translations.actions.setLanguage.request("pl");

			return expectSaga(loadPageTranslation, action)
				.provide([
					[
						matchers.race({
							contents: race.call(pageContentsApi.fetchPageContents, "pl"),
							providerError: race.take(translations.actions.setLanguage.failed.type)
						}),
						{
							contents: undefined,
							providerError: translations.actions.setLanguage.failed("pl", {
								from: "translation-provider",
								translationProviderId: "contact",
								error: new Error("some error")
							})
						}
					]
				])
				.race({
					contents: race.call(pageContentsApi.fetchPageContents, "pl"),
					providerError: race.take(translations.actions.setLanguage.failed.type)
				})
				.not.put(pageTranslations.actions.pageTranslationsFetched("pl", undefined as any))
				.not.put(translations.actions.translationProviderReady("page"))
				.run();
		});
	});
});
