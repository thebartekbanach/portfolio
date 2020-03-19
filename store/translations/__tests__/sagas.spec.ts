import { expectSaga } from "redux-saga-test-plan";
import { delay, race } from "~/lib/sagaEffects";
import * as matchers from "redux-saga-test-plan/matchers";
import * as providers from "~/tests/utils/testEffectsProviders";
import { translations } from "..";
import {
	changeLanguageIfPageAndTranslationsAreReady,
	makeSureAllTranslationProvidersAreReady,
	changeCurrentLanguage,
	makeSurePageIsHidden
} from "../sagas";
import { environment } from "~/store/environment";

describe("translations state sagas", () => {
	describe("changeLanguageIfPageAndTranslationsAreReady", () => {
		it("should correctly change language if page is hidden and translations are ready", () => {
			return expectSaga(changeLanguageIfPageAndTranslationsAreReady)
				.provide([
					[
						matchers.race({
							providersLoadedCorrectly: race.call(
								makeSureAllTranslationProvidersAreReady
							),
							providersLoadTimeout: delay(
								translations.constants.translationProvidersLoadTimeoutTime
							)
						}),
						{ providersLoadedCorrectly: true, providersLoadTimeout: undefined }
					],
					[
						matchers.race({
							pageIsHidden: race.call(makeSurePageIsHidden),
							pageHideTimeout: delay(translations.constants.pageHideTimeoutTime)
						}),
						{ pageIsHidden: true, pageHideTimeout: undefined }
					],
					[matchers.call(changeCurrentLanguage), undefined]
				])
				.call(changeCurrentLanguage)
				.run();
		});

		it("should not change language if translations loading error ocurred", () => {
			return expectSaga(changeLanguageIfPageAndTranslationsAreReady)
				.provide([
					[
						matchers.race({
							providersLoadedCorrectly: race.call(
								makeSureAllTranslationProvidersAreReady
							),
							providersLoadTimeout: delay(
								translations.constants.translationProvidersLoadTimeoutTime
							)
						}),
						{ providersLoadedCorrectly: false, providersLoadTimeout: undefined }
					],
					[
						matchers.race({
							pageIsHidden: race.call(makeSurePageIsHidden),
							pageHideTimeout: delay(translations.constants.pageHideTimeoutTime)
						}),
						{ pageIsHidden: true, pageHideTimeout: undefined }
					],
					[matchers.call(changeCurrentLanguage), undefined]
				])
				.not.call(changeCurrentLanguage)
				.run();
		});

		it("should not call makeSurePageIsHidden race if translations loading error ocurred", () => {
			return expectSaga(changeLanguageIfPageAndTranslationsAreReady)
				.provide([
					[
						matchers.race({
							providersLoadedCorrectly: race.call(
								makeSureAllTranslationProvidersAreReady
							),
							providersLoadTimeout: delay(
								translations.constants.translationProvidersLoadTimeoutTime
							)
						}),
						{ providersLoadedCorrectly: false, providersLoadTimeout: undefined }
					],
					[matchers.call(changeCurrentLanguage), undefined]
				])
				.not.race({
					pageIsHidden: race.call(makeSurePageIsHidden),
					pageHideTimeout: delay(translations.constants.pageHideTimeoutTime)
				})
				.not.call(changeCurrentLanguage)
				.run();
		});

		it("should not change language and should put setLanguage.failed if providersLoadTimeout ocurred", () => {
			return expectSaga(changeLanguageIfPageAndTranslationsAreReady)
				.provide([
					[
						matchers.race({
							providersLoadedCorrectly: race.call(
								makeSureAllTranslationProvidersAreReady
							),
							providersLoadTimeout: delay(
								translations.constants.translationProvidersLoadTimeoutTime
							)
						}),
						{ providersLoadedCorrectly: undefined, providersLoadTimeout: "__elapsed__" }
					],
					[
						matchers.race({
							pageIsHidden: race.call(makeSurePageIsHidden),
							pageHideTimeout: delay(translations.constants.pageHideTimeoutTime)
						}),
						{ pageIsHidden: true, pageHideTimeout: undefined }
					],
					[matchers.call(changeCurrentLanguage), undefined],
					[matchers.select(translations.selectors.pendingLanguageCode), "pl"]
				])
				.put(
					translations.actions.setLanguage.failed("pl", {
						from: "redux-saga",
						error: new Error(
							`Providers load timeout ocurred after ${translations.constants.translationProvidersLoadTimeoutTime}ms`
						)
					})
				)
				.not.call(changeCurrentLanguage)
				.run();
		});

		it("should not change language and should put setLanguage.failed if pageHideTimeout ocurred", () => {
			return expectSaga(changeLanguageIfPageAndTranslationsAreReady)
				.provide([
					[
						matchers.race({
							providersLoadedCorrectly: race.call(
								makeSureAllTranslationProvidersAreReady
							),
							providersLoadTimeout: delay(
								translations.constants.translationProvidersLoadTimeoutTime
							)
						}),
						{ providersLoadedCorrectly: true, providersLoadTimeout: undefined }
					],
					[
						matchers.race({
							pageIsHidden: race.call(makeSurePageIsHidden),
							pageHideTimeout: delay(translations.constants.pageHideTimeoutTime)
						}),
						{ pageIsHidden: undefined, pageHideTimeout: "__elapsed__" }
					],
					[matchers.call(changeCurrentLanguage), undefined],
					[matchers.select(translations.selectors.pendingLanguageCode), "pl"]
				])
				.put(
					translations.actions.setLanguage.failed("pl", {
						from: "redux-saga",
						error: new Error(
							`Page hide timeout ocurred after ${translations.constants.pageHideTimeoutTime}ms`
						)
					})
				)
				.not.call(changeCurrentLanguage)
				.run();
		});
	});

	describe("makeSureAllTranslationProvidersAreReady", () => {
		it("should return true if allTranslationProvidersAreReady returns true", () => {
			return expectSaga(makeSureAllTranslationProvidersAreReady)
				.provide([
					[matchers.select(translations.selectors.areAllTranslationProvidersReady), true]
				])
				.returns(true)
				.run();
		});

		it("should wait for all translation providers to be ready", () => {
			const areAllTranslationProvidersReady = jest
				.fn()
				.mockReturnValueOnce(false)
				.mockReturnValueOnce(false)
				.mockReturnValueOnce(true);

			const readyOrFailedTakeType = [
				translations.actions.translationProviderReady.type,
				translations.actions.setLanguage.failed.type
			];

			return expectSaga(makeSureAllTranslationProvidersAreReady)
				.provide([
					providers.select(
						translations.selectors.areAllTranslationProvidersReady,
						areAllTranslationProvidersReady
					)
				])
				.take(readyOrFailedTakeType)
				.dispatch(translations.actions.translationProviderReady("page"))
				.take(readyOrFailedTakeType)
				.dispatch(translations.actions.translationProviderReady("contact"))
				.returns(true)
				.run();
		});

		it("should return false if setLanguage.failed action ocurred", () => {
			const areAllTranslationProvidersReady = jest.fn().mockReturnValue(false);

			const readyOrFailedTakeType = [
				translations.actions.translationProviderReady.type,
				translations.actions.setLanguage.failed.type
			];

			return expectSaga(makeSureAllTranslationProvidersAreReady)
				.provide([
					providers.select(
						translations.selectors.areAllTranslationProvidersReady,
						areAllTranslationProvidersReady
					)
				])
				.take(readyOrFailedTakeType)
				.dispatch(translations.actions.translationProviderReady("page"))
				.take(readyOrFailedTakeType)
				.dispatch(
					translations.actions.setLanguage.failed("pl", {
						from: "translation-provider",
						translationProviderId: "contact",
						error: new Error("error")
					})
				)
				.returns(false)
				.run();
		});
	});

	describe("makeSurePageIsHidden", () => {
		it("should return true if page is hidden", () => {
			return expectSaga(makeSurePageIsHidden)
				.provide([
					[matchers.select(environment.selectors.isRunningOnServer), false],
					[matchers.select(translations.selectors.isPageHidden), true]
				])
				.returns(true)
				.run();
		});

		it("should take pageHasBeenHidden action and return true", () => {
			return expectSaga(makeSurePageIsHidden)
				.provide([
					[matchers.select(environment.selectors.isRunningOnServer), false],
					[matchers.select(translations.selectors.isPageHidden), false]
				])
				.take(translations.actions.pageHasBeenHidden)
				.dispatch(translations.actions.pageHasBeenHidden())
				.returns(true)
				.run();
		});

		it("should return true without calling isPageHidden select if running on server", () => {
			return expectSaga(makeSurePageIsHidden)
				.provide([
					[matchers.select(environment.selectors.isRunningOnServer), true],
					[matchers.select(translations.selectors.isPageHidden), false]
				])
				.not.take(translations.actions.pageHasBeenHidden)
				.returns(true)
				.run();
		});
	});

	describe("changeCurrentLanguage", () => {
		it("should put setLanguage.success if pendingLanguageCode is not null", () => {
			return expectSaga(changeCurrentLanguage)
				.provide([[matchers.select(translations.selectors.pendingLanguageCode), "pl"]])
				.put(translations.actions.setLanguage.success("pl"))
				.run();
		});

		it("should put setLanguage.failed if pendingLanguageCode is null", () => {
			return expectSaga(changeCurrentLanguage)
				.provide([[matchers.select(translations.selectors.pendingLanguageCode), null]])
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
