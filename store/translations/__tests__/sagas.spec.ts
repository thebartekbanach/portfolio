import { expectSaga } from "redux-saga-test-plan";
import { changeLanguageIfPageAndTranslationsAreReady } from "../sagas";
import { language } from "../actions";
import { isRunningOnServerSelector } from "~/store/environment/selectors";
import {
	areAllTranslationProvidersReady,
	pendingLanguageCodeSelector,
	isPageHiddenSelector
} from "../selectors";
import { select, put } from "redux-saga/effects";

describe("translations state sagas", () => {
	describe("changeLanguageIfPageAndTranslationsAreReady", () => {
		it("should put success action if translation providers are ready and pageHasBeenHidden is equal to true", () => {
			return expectSaga(changeLanguageIfPageAndTranslationsAreReady)
				.provide([
					[select(isRunningOnServerSelector), false],
					[select(areAllTranslationProvidersReady), true],
					[select(pendingLanguageCodeSelector), "pl"],
					[select(isPageHiddenSelector), true]
				])
				.put(language.setLanguage.success("pl"))
				.run();
		});

		it("should not put success action when page is hidden and translation providers are not ready", () => {
			return expectSaga(changeLanguageIfPageAndTranslationsAreReady)
				.provide([
					[select(isRunningOnServerSelector), false],
					[select(areAllTranslationProvidersReady), false],
					[select(pendingLanguageCodeSelector), "pl"],
					[select(isPageHiddenSelector), true]
				])
				.not.put(language.setLanguage.success("pl"))
				.run();
		});

		it("should not put success action when translation providers are ready and page is not hidden", () => {
			return expectSaga(changeLanguageIfPageAndTranslationsAreReady)
				.provide([
					[select(isRunningOnServerSelector), false],
					[select(areAllTranslationProvidersReady), true],
					[select(pendingLanguageCodeSelector), "pl"],
					[select(isPageHiddenSelector), false]
				])
				.not.put(language.setLanguage.success("pl"))
				.run();
		});

		it("should put success action if translation providers are ready and isRunningOnServer is equal to true", () => {
			return expectSaga(changeLanguageIfPageAndTranslationsAreReady)
				.provide([
					[select(isRunningOnServerSelector), true],
					[select(areAllTranslationProvidersReady), true],
					[select(pendingLanguageCodeSelector), "pl"]
				])
				.put(language.setLanguage.success("pl"))
				.run();
		});

		it("should not put success action when isRunningOnServer and translation providers are not ready", () => {
			return expectSaga(changeLanguageIfPageAndTranslationsAreReady)
				.provide([
					[select(isRunningOnServerSelector), true],
					[select(areAllTranslationProvidersReady), false]
				])
				.not.put(language.setLanguage.success("pl"))
				.run();
		});

		it("should put failed action when page is hidden and translation providers are ready but pending language is undefined", () => {
			return expectSaga(changeLanguageIfPageAndTranslationsAreReady)
				.provide([
					[select(isRunningOnServerSelector), false],
					[select(areAllTranslationProvidersReady), true],
					[select(pendingLanguageCodeSelector), undefined],
					[select(isPageHiddenSelector), true]
				])
				.put(
					language.setLanguage.failed(undefined, {
						from: "redux-saga",
						error: new Error(
							"Attempt to set current language when pendingLanguageCode is undefined"
						)
					})
				)
				.run();
		});

		it("should put failed action when isRunningOnServer and translation providers are ready but pending language is undefined", () => {
			return expectSaga(changeLanguageIfPageAndTranslationsAreReady)
				.provide([
					[select(isRunningOnServerSelector), true],
					[select(areAllTranslationProvidersReady), true],
					[select(pendingLanguageCodeSelector), undefined]
				])
				.put(
					language.setLanguage.failed(undefined, {
						from: "redux-saga",
						error: new Error(
							"Attempt to set current language when pendingLanguageCode is undefined"
						)
					})
				)
				.run();
		});
	});
});
