import { expectSaga } from "redux-saga-test-plan";
import { changeLanguageIfPageAndTranslationsAreReady } from "../sagas";
import { isRunningOnServerSelector } from "~/store/environment/selectors";
import { areAllTranslationProvidersReady, pendingLanguageCode, isPageHidden } from "../selectors";
import { select } from "redux-saga/effects";
import { translations } from "..";

describe("translations state sagas", () => {
	describe("changeLanguageIfPageAndTranslationsAreReady", () => {
		it("should put success action if translation providers are ready and pageHasBeenHidden is equal to true", () => {
			return expectSaga(changeLanguageIfPageAndTranslationsAreReady)
				.provide([
					[select(isRunningOnServerSelector), false],
					[select(areAllTranslationProvidersReady), true],
					[select(pendingLanguageCode), "pl"],
					[select(isPageHidden), true]
				])
				.put(translations.actions.setLanguage.success("pl"))
				.run();
		});

		it("should not put success action when page is hidden and translation providers are not ready", () => {
			return expectSaga(changeLanguageIfPageAndTranslationsAreReady)
				.provide([
					[select(isRunningOnServerSelector), false],
					[select(areAllTranslationProvidersReady), false],
					[select(pendingLanguageCode), "pl"],
					[select(isPageHidden), true]
				])
				.not.put(translations.actions.setLanguage.success("pl"))
				.run();
		});

		it("should not put success action when translation providers are ready and page is not hidden", () => {
			return expectSaga(changeLanguageIfPageAndTranslationsAreReady)
				.provide([
					[select(isRunningOnServerSelector), false],
					[select(areAllTranslationProvidersReady), true],
					[select(pendingLanguageCode), "pl"],
					[select(isPageHidden), false]
				])
				.not.put(translations.actions.setLanguage.success("pl"))
				.run();
		});

		it("should put success action if translation providers are ready and isRunningOnServer is equal to true", () => {
			return expectSaga(changeLanguageIfPageAndTranslationsAreReady)
				.provide([
					[select(isRunningOnServerSelector), true],
					[select(areAllTranslationProvidersReady), true],
					[select(pendingLanguageCode), "pl"]
				])
				.put(translations.actions.setLanguage.success("pl"))
				.run();
		});

		it("should not put success action when isRunningOnServer and translation providers are not ready", () => {
			return expectSaga(changeLanguageIfPageAndTranslationsAreReady)
				.provide([
					[select(isRunningOnServerSelector), true],
					[select(areAllTranslationProvidersReady), false]
				])
				.not.put(translations.actions.setLanguage.success("pl"))
				.run();
		});

		it("should put failed action when page is hidden and translation providers are ready but pending language is null", () => {
			return expectSaga(changeLanguageIfPageAndTranslationsAreReady)
				.provide([
					[select(isRunningOnServerSelector), false],
					[select(areAllTranslationProvidersReady), true],
					[select(pendingLanguageCode), null],
					[select(isPageHidden), true]
				])
				.put(
					translations.actions.setLanguage.failed(null, {
						from: "redux-saga",
						error: new Error(
							"Attempt to set current language when pendingLanguageCode is null"
						)
					})
				)
				.run();
		});

		it("should put failed action when isRunningOnServer and translation providers are ready but pending language is null", () => {
			return expectSaga(changeLanguageIfPageAndTranslationsAreReady)
				.provide([
					[select(isRunningOnServerSelector), true],
					[select(areAllTranslationProvidersReady), true],
					[select(pendingLanguageCode), null]
				])
				.put(
					translations.actions.setLanguage.failed(null, {
						from: "redux-saga",
						error: new Error(
							"Attempt to set current language when pendingLanguageCode is null"
						)
					})
				)
				.run();
		});
	});
});
