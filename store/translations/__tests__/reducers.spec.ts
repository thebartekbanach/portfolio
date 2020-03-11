import { language } from "../actions";
import { LoadingState, PageState } from "../models";
import { translationsReducer } from "../reducers";

describe("translationsReducer.registeredTranslationProviders reducer", () => {
	it("should add new translation provider id", () => {
		const initialState = [];
		const action = language.registerTranslationProvider("page");

		const result = translationsReducer.registeredTranslationProviders(initialState, action);

		expect(result).toContainEqual("page");
	});

	it("should not mutate state", () => {
		const initialState = ["page"];
		const action = language.registerTranslationProvider("contact");

		const result = translationsReducer.registeredTranslationProviders(initialState, action);

		expect(result).not.toBe(initialState);
	});

	it("should add new translation provider and leave existing ones", () => {
		const initialState = ["page"];
		const action = language.registerTranslationProvider("contact");

		const result = translationsReducer.registeredTranslationProviders(initialState, action);

		expect(result).toEqual(["page", "contact"]);
	});

	it("should not add existing translation provider id", () => {
		const initialState = ["page"];
		const action = language.registerTranslationProvider("page");

		const result = translationsReducer.registeredTranslationProviders(initialState, action);

		expect(result).toBe(initialState);
	});
});

describe("translationsReducer.pendingLanguageCode reducer", () => {
	it("should set pending language to requested language", () => {
		const initialState = null;
		const action = language.setLanguage.request("pl");

		const result = translationsReducer.pendingLanguageCode(initialState, action);

		expect(result).toEqual("pl");
	});

	it("should not change pending language when is already loading", () => {
		const initialState = "pl";
		const action = language.setLanguage.request("en");

		const result = translationsReducer.pendingLanguageCode(initialState, action);

		expect(result).toBe(initialState);
	});

	it("should set pending language to null after success", () => {
		const initialState = "pl";
		const action = language.setLanguage.success("pl");

		const result = translationsReducer.pendingLanguageCode(initialState, action);

		expect(result).toBe(null);
	});

	it("should set pending language to null after failure", () => {
		const initialState = "pl";
		const action = language.setLanguage.failed("pl", {
			from: "translation-provider",
			translationProviderId: "page",
			statusCode: 500
		});

		const result = translationsReducer.pendingLanguageCode(initialState, action);

		expect(result).toBe(null);
	});
});

describe("translationsReducer.currentLanguageCode reducer", () => {
	it("should set current language after success", () => {
		const initialState = "pl";
		const action = language.setLanguage.success("en");

		const result = translationsReducer.currentLanguageCode(initialState, action);

		expect(result).toEqual("en");
	});

	it("should not change state if language code is the same", () => {
		const initialState = "pl";
		const action = language.setLanguage.success("pl");

		const result = translationsReducer.currentLanguageCode(initialState, action);

		expect(result).toBe(initialState);
	});
});

describe("translationsReducer.pageState reducer", () => {
	it("should change state to 'hiding' after language change request action", () => {
		const initialState: PageState = "shown";
		const action = language.setLanguage.request("pl");

		const result = translationsReducer.pageState(initialState, action);

		expect(result).toEqual<PageState>("hiding");
	});

	it("should change state to 'hidden' after pageHasBeenHidden action", () => {
		const initialState: PageState = "hiding";
		const action = language.pageHasBeenHidden();

		const result = translationsReducer.pageState(initialState, action);

		expect(result).toEqual<PageState>("hidden");
	});

	it("should change state to 'shown' after language change success action", () => {
		const initialState: PageState = "hidden";
		const action = language.setLanguage.success("pl");

		const result = translationsReducer.pageState(initialState, action);

		expect(result).toEqual<PageState>("shown");
	});

	it("should change state to 'shown' after language change failed action when initial state is 'hidden'", () => {
		const initialState: PageState = "hidden";
		const action = language.setLanguage.failed("pl", {
			from: "translation-provider",
			translationProviderId: "page",
			statusCode: 500
		});

		const result = translationsReducer.pageState(initialState, action);

		expect(result).toEqual<PageState>("shown");
	});

	it("should change state to 'shown' after language change failed action when initial state is 'hiding'", () => {
		const initialState: PageState = "hiding";
		const action = language.setLanguage.failed("pl", {
			from: "translation-provider",
			translationProviderId: "page",
			statusCode: 500
		});

		const result = translationsReducer.pageState(initialState, action);

		expect(result).toEqual<PageState>("shown");
	});
});

describe("translationsReducer.loadingState reducer", () => {
	it("should register translation provider correctly", () => {
		const initialState = {};
		const action = language.registerTranslationProvider("page");

		const result = translationsReducer.loadingState(initialState, action);

		expect(result).toHaveProperty("page", false);
	});

	it("should register second translation provider correctly", () => {
		const initialState = { page: false };
		const action = language.registerTranslationProvider("contact");

		const result = translationsReducer.loadingState(initialState, action);

		expect(result).toEqual({ page: false, contact: false });
	});

	it("should not modify original state", () => {
		const initialState = { page: false };
		const action = language.registerTranslationProvider("contact");

		const result = translationsReducer.loadingState(initialState, action);

		expect(result).not.toBe(initialState);
	});

	it("should mark specified provider as loaded by translationProviderReady action", () => {
		const initialState = { page: false, contact: false };
		const action = language.translationProviderReady("contact");

		const result = translationsReducer.loadingState(initialState, action);

		expect(result).toEqual({ page: false, contact: true });
	});

	it("should reset states to true on language.setLanguage request action", () => {
		const initialState = { page: true, contact: true };
		const action = language.setLanguage.success("pl");

		const result = translationsReducer.loadingState(initialState, action);

		expect(result).toEqual({ page: true, contact: true });
	});

	it("should reset states to true on language.setLanguage failed action", () => {
		const initialState = { page: false, contact: false };
		const action = language.setLanguage.failed("pl", {
			from: "translation-provider",
			translationProviderId: "page",
			statusCode: 500
		});

		const result = translationsReducer.loadingState(initialState, action);

		expect(result).toEqual({ page: true, contact: true });
	});

	it("should reset states to false on setLanuage request action", () => {
		const initialState = { page: true, contact: true };
		const action = language.setLanguage.request("pl");

		const result = translationsReducer.loadingState(initialState, action);

		expect(result).toEqual({ page: false, contact: false });
	});
});

describe("translationsReducer.availableLanguages reducer", () => {
	it("should set available languages on setupAvailableLanguages action", () => {
		const initialState = [];
		const availableLanguages = [
			{ code: "pl", name: "Polski" },
			{ code: "en", name: "english" }
		];
		const action = language.setupAvailableLanguages(availableLanguages);

		const result = translationsReducer.availableLanguages(initialState, action);

		expect(result).toEqual(availableLanguages);
	});
});
