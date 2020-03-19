import { configureStore } from "../configureStore";
import { DeepPartial } from "redux";
import { Store } from "..";
import { translations } from "../translations";
import { environment } from "../environment";
import { wait } from "~/tests/utils/wait";

describe("translations integration tests", () => {
	it("should correctly change language if every translation provider is ready and page is rendering on server", () => {
		const store = configureStore(undefined as any, { isServer: true });

		const availableLanguagesSetup = translations.actions.setupAvailableLanguages([
			{ code: "pl", name: "Polski" },
			{ code: "en", name: "English" }
		]);
		const registerPageTranslationProvider = translations.actions.registerTranslationProvider(
			"page"
		);
		const registerContactTranslationProvider = translations.actions.registerTranslationProvider(
			"contact"
		);
		const setPolishLanguageRequest = translations.actions.setLanguage.request("pl");
		const pageTranslationProviderReady = translations.actions.translationProviderReady("page");
		const contactTranslationProviderReady = translations.actions.translationProviderReady(
			"contact"
		);

		store.dispatch(availableLanguagesSetup);
		store.dispatch(registerPageTranslationProvider);
		store.dispatch(registerContactTranslationProvider);
		store.dispatch(setPolishLanguageRequest);
		store.dispatch(pageTranslationProviderReady);
		store.dispatch(contactTranslationProviderReady);
		const result = store.getState();

		expect(result).toMatchObject<DeepPartial<Store>>({
			translations: {
				availableLanguages: [
					{ code: "pl", name: "Polski" },
					{ code: "en", name: "English" }
				],
				currentLanguageCode: "pl",
				loadingState: {
					page: true,
					contact: true
				},
				pageState: "shown",
				pendingLanguageCode: null,
				registeredTranslationProviders: ["page", "contact"]
			}
		});
	});

	it("should correctly change language if every translation provider is ready and is running in browser", () => {
		const store = configureStore(undefined as any, { isServer: true });

		const changeRunningEnvironmentToBrowser = environment.actions.runningEnvironmentChanged();
		const availableLanguagesSetup = translations.actions.setupAvailableLanguages([
			{ code: "pl", name: "Polski" },
			{ code: "en", name: "English" }
		]);
		const registerPageTranslationProvider = translations.actions.registerTranslationProvider(
			"page"
		);
		const registerContactTranslationProvider = translations.actions.registerTranslationProvider(
			"contact"
		);
		const setPolishLanguageRequest = translations.actions.setLanguage.request("pl");
		const pageTranslationProviderReady = translations.actions.translationProviderReady("page");
		const contactTranslationProviderReady = translations.actions.translationProviderReady(
			"contact"
		);
		const pageHasBeenHidden = translations.actions.pageHasBeenHidden();

		store.dispatch(changeRunningEnvironmentToBrowser);
		store.dispatch(availableLanguagesSetup);
		store.dispatch(registerPageTranslationProvider);
		store.dispatch(registerContactTranslationProvider);
		store.dispatch(setPolishLanguageRequest);
		store.dispatch(pageTranslationProviderReady);
		store.dispatch(contactTranslationProviderReady);
		store.dispatch(pageHasBeenHidden);
		const result = store.getState();

		expect(result).toMatchObject<DeepPartial<Store>>({
			translations: {
				availableLanguages: [
					{ code: "pl", name: "Polski" },
					{ code: "en", name: "English" }
				],
				currentLanguageCode: "pl",
				loadingState: {
					page: true,
					contact: true
				},
				pageState: "shown",
				pendingLanguageCode: null,
				registeredTranslationProviders: ["page", "contact"]
			}
		});
	});

	it("should not change language if one of translation providers is not ready yet", () => {
		const store = configureStore(undefined as any, { isServer: true });

		const changeRunningEnvironmentToBrowser = environment.actions.runningEnvironmentChanged();
		const availableLanguagesSetup = translations.actions.setupAvailableLanguages([
			{ code: "pl", name: "Polski" },
			{ code: "en", name: "English" }
		]);
		const registerPageTranslationProvider = translations.actions.registerTranslationProvider(
			"page"
		);
		const registerContactTranslationProvider = translations.actions.registerTranslationProvider(
			"contact"
		);
		const setPolishLanguageRequest = translations.actions.setLanguage.request("pl");
		const pageTranslationProviderReady = translations.actions.translationProviderReady("page");
		const pageHasBeenHidden = translations.actions.pageHasBeenHidden();

		store.dispatch(changeRunningEnvironmentToBrowser);
		store.dispatch(availableLanguagesSetup);
		store.dispatch(registerPageTranslationProvider);
		store.dispatch(registerContactTranslationProvider);
		store.dispatch(setPolishLanguageRequest);
		store.dispatch(pageTranslationProviderReady);
		store.dispatch(pageHasBeenHidden);
		const result = store.getState();

		expect(result).toMatchObject<DeepPartial<Store>>({
			translations: {
				currentLanguageCode: "en",
				loadingState: {
					page: true,
					contact: false
				},
				pageState: "hidden",
				pendingLanguageCode: "pl"
			}
		});
	});

	it("should not change language if page is not hidden yet", () => {
		const store = configureStore(undefined as any, { isServer: true });

		const changeRunningEnvironmentToBrowser = environment.actions.runningEnvironmentChanged();
		const availableLanguagesSetup = translations.actions.setupAvailableLanguages([
			{ code: "pl", name: "Polski" },
			{ code: "en", name: "English" }
		]);
		const registerPageTranslationProvider = translations.actions.registerTranslationProvider(
			"page"
		);
		const registerContactTranslationProvider = translations.actions.registerTranslationProvider(
			"contact"
		);
		const setPolishLanguageRequest = translations.actions.setLanguage.request("pl");
		const pageTranslationProviderReady = translations.actions.translationProviderReady("page");
		const contactTranslationProviderReady = translations.actions.translationProviderReady(
			"contact"
		);

		store.dispatch(changeRunningEnvironmentToBrowser);
		store.dispatch(availableLanguagesSetup);
		store.dispatch(registerPageTranslationProvider);
		store.dispatch(registerContactTranslationProvider);
		store.dispatch(setPolishLanguageRequest);
		store.dispatch(pageTranslationProviderReady);
		store.dispatch(contactTranslationProviderReady);
		const result = store.getState();

		expect(result).toMatchObject<DeepPartial<Store>>({
			translations: {
				currentLanguageCode: "en",
				loadingState: {
					page: true,
					contact: true
				},
				pageState: "hiding",
				pendingLanguageCode: "pl"
			}
		});
	});

	it("should not change current language on translation provider load error", () => {
		const store = configureStore(undefined as any, { isServer: true });

		const changeRunningEnvironmentToBrowser = environment.actions.runningEnvironmentChanged();
		const availableLanguagesSetup = translations.actions.setupAvailableLanguages([
			{ code: "pl", name: "Polski" },
			{ code: "en", name: "English" }
		]);
		const registerPageTranslationProvider = translations.actions.registerTranslationProvider(
			"page"
		);
		const registerContactTranslationProvider = translations.actions.registerTranslationProvider(
			"contact"
		);
		const setPolishLanguageRequest = translations.actions.setLanguage.request("pl");
		const pageTranslationProviderReady = translations.actions.translationProviderReady("page");
		const pageHasBeenHidden = translations.actions.pageHasBeenHidden();
		const contactTranslationProviderFailed = translations.actions.setLanguage.failed("pl", {
			from: "translation-provider",
			translationProviderId: "contact",
			error: new Error("error")
		});

		store.dispatch(changeRunningEnvironmentToBrowser);
		store.dispatch(availableLanguagesSetup);
		store.dispatch(registerPageTranslationProvider);
		store.dispatch(registerContactTranslationProvider);
		store.dispatch(setPolishLanguageRequest);
		store.dispatch(pageTranslationProviderReady);
		store.dispatch(pageHasBeenHidden);
		store.dispatch(contactTranslationProviderFailed);
		const result = store.getState();

		expect(result).toMatchObject<DeepPartial<Store>>({
			translations: {
				currentLanguageCode: "en",
				loadingState: {
					page: true,
					contact: true
				},
				pageState: "shown",
				pendingLanguageCode: null
			}
		});
	});

	it("should not change language on translation provider loading timeout", async () => {
		const store = configureStore(undefined as any, { isServer: true });

		const changeRunningEnvironmentToBrowser = environment.actions.runningEnvironmentChanged();
		const availableLanguagesSetup = translations.actions.setupAvailableLanguages([
			{ code: "pl", name: "Polski" },
			{ code: "en", name: "English" }
		]);
		const registerPageTranslationProvider = translations.actions.registerTranslationProvider(
			"page"
		);
		const registerContactTranslationProvider = translations.actions.registerTranslationProvider(
			"contact"
		);
		const setPolishLanguageRequest = translations.actions.setLanguage.request("pl");
		const pageTranslationProviderReady = translations.actions.translationProviderReady("page");
		const pageHasBeenHidden = translations.actions.pageHasBeenHidden();

		store.dispatch(changeRunningEnvironmentToBrowser);
		store.dispatch(availableLanguagesSetup);
		store.dispatch(registerPageTranslationProvider);
		store.dispatch(registerContactTranslationProvider);
		store.dispatch(setPolishLanguageRequest);
		store.dispatch(pageTranslationProviderReady);
		store.dispatch(pageHasBeenHidden);
		const beforeTimeout = store.getState();
		await wait(translations.constants.translationProvidersLoadTimeoutTime + 100);
		const afterTimeout = store.getState();

		expect(beforeTimeout).toMatchObject<DeepPartial<Store>>({
			translations: {
				currentLanguageCode: "en",
				loadingState: {
					page: true,
					contact: false
				},
				pageState: "hidden",
				pendingLanguageCode: "pl"
			}
		});

		expect(afterTimeout).toMatchObject<DeepPartial<Store>>({
			translations: {
				currentLanguageCode: "en",
				loadingState: {
					page: true,
					contact: true
				},
				pageState: "shown",
				pendingLanguageCode: null
			}
		});
	}, 6000);

	it("should not change language on page hide timeout", async () => {
		const store = configureStore(undefined as any, { isServer: true });

		const changeRunningEnvironmentToBrowser = environment.actions.runningEnvironmentChanged();
		const availableLanguagesSetup = translations.actions.setupAvailableLanguages([
			{ code: "pl", name: "Polski" },
			{ code: "en", name: "English" }
		]);
		const registerPageTranslationProvider = translations.actions.registerTranslationProvider(
			"page"
		);
		const registerContactTranslationProvider = translations.actions.registerTranslationProvider(
			"contact"
		);
		const setPolishLanguageRequest = translations.actions.setLanguage.request("pl");
		const pageTranslationProviderReady = translations.actions.translationProviderReady("page");
		const contactTranslationProviderReady = translations.actions.translationProviderReady(
			"contact"
		);

		store.dispatch(changeRunningEnvironmentToBrowser);
		store.dispatch(availableLanguagesSetup);
		store.dispatch(registerPageTranslationProvider);
		store.dispatch(registerContactTranslationProvider);
		store.dispatch(setPolishLanguageRequest);
		store.dispatch(pageTranslationProviderReady);
		store.dispatch(contactTranslationProviderReady);
		const beforeTimeout = store.getState();
		await wait(translations.constants.pageHideTimeoutTime + 100);
		const afterTimeout = store.getState();

		expect(beforeTimeout).toMatchObject<DeepPartial<Store>>({
			translations: {
				currentLanguageCode: "en",
				loadingState: {
					page: true,
					contact: true
				},
				pageState: "hiding",
				pendingLanguageCode: "pl"
			}
		});

		expect(afterTimeout).toMatchObject<DeepPartial<Store>>({
			translations: {
				currentLanguageCode: "en",
				loadingState: {
					page: true,
					contact: true
				},
				pageState: "shown",
				pendingLanguageCode: null
			}
		});
	});
});
