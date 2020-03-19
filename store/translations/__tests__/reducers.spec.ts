import { PageState } from "../models";
import { translationsReducer } from "../reducers";
import { translations } from "..";

describe("translationsReducer.registeredTranslationProviders reducer", () => {
	it("should add new translation provider id", () => {
		const initialState = [];
		const action = translations.actions.registerTranslationProvider("page");

		const result = translationsReducer.registeredTranslationProviders(initialState, action);

		expect(result).toContainEqual("page");
	});

	it("should not mutate state", () => {
		const initialState = ["page"];
		const action = translations.actions.registerTranslationProvider("contact");

		const result = translationsReducer.registeredTranslationProviders(initialState, action);

		expect(result).not.toBe(initialState);
	});

	it("should add new translation provider and leave existing ones", () => {
		const initialState = ["page"];
		const action = translations.actions.registerTranslationProvider("contact");

		const result = translationsReducer.registeredTranslationProviders(initialState, action);

		expect(result).toEqual(["page", "contact"]);
	});

	it("should not add existing translation provider id", () => {
		const initialState = ["page"];
		const action = translations.actions.registerTranslationProvider("page");

		const result = translationsReducer.registeredTranslationProviders(initialState, action);

		expect(result).toBe(initialState);
	});
});

describe("translationsReducer.pendingLanguageCode reducer", () => {
	it("should set pending translations.actions to requested translations.actions", () => {
		const initialState = null;
		const action = translations.actions.setLanguage.request("pl");

		const result = translationsReducer.pendingLanguageCode(initialState, action);

		expect(result).toEqual("pl");
	});

	it("should not change pending translations.actions when is already loading", () => {
		const initialState = "pl";
		const action = translations.actions.setLanguage.request("en");

		const result = translationsReducer.pendingLanguageCode(initialState, action);

		expect(result).toBe(initialState);
	});

	it("should set pending translations.actions to null after success", () => {
		const initialState = "pl";
		const action = translations.actions.setLanguage.success("pl");

		const result = translationsReducer.pendingLanguageCode(initialState, action);

		expect(result).toBe(null);
	});

	it("should set pending translations.actions to null after failure", () => {
		const initialState = "pl";
		const action = translations.actions.setLanguage.failed("pl", {
			from: "translation-provider",
			translationProviderId: "page",
			error: new Error("error")
		});

		const result = translationsReducer.pendingLanguageCode(initialState, action);

		expect(result).toBe(null);
	});
});

describe("translationsReducer.currentLanguageCode reducer", () => {
	it("should set current translations.actions after success", () => {
		const initialState = "pl";
		const action = translations.actions.setLanguage.success("en");

		const result = translationsReducer.currentLanguageCode(initialState, action);

		expect(result).toEqual("en");
	});

	it("should not change state if translations.actions code is the same", () => {
		const initialState = "pl";
		const action = translations.actions.setLanguage.success("pl");

		const result = translationsReducer.currentLanguageCode(initialState, action);

		expect(result).toBe(initialState);
	});
});

describe("translationsReducer.pageState reducer", () => {
	it("should change state to 'hiding' after translations.actions change request action", () => {
		const initialState: PageState = "shown";
		const action = translations.actions.setLanguage.request("pl");

		const result = translationsReducer.pageState(initialState, action);

		expect(result).toEqual<PageState>("hiding");
	});

	it("should change state to 'hidden' after pageHasBeenHidden action", () => {
		const initialState: PageState = "hiding";
		const action = translations.actions.pageHasBeenHidden();

		const result = translationsReducer.pageState(initialState, action);

		expect(result).toEqual<PageState>("hidden");
	});

	it("should change state to 'shown' after translations.actions change success action", () => {
		const initialState: PageState = "hidden";
		const action = translations.actions.setLanguage.success("pl");

		const result = translationsReducer.pageState(initialState, action);

		expect(result).toEqual<PageState>("shown");
	});

	it("should change state to 'shown' after translations.actions change failed action when initial state is 'hidden'", () => {
		const initialState: PageState = "hidden";
		const action = translations.actions.setLanguage.failed("pl", {
			from: "translation-provider",
			translationProviderId: "page",
			error: new Error("error")
		});

		const result = translationsReducer.pageState(initialState, action);

		expect(result).toEqual<PageState>("shown");
	});

	it("should change state to 'shown' after translations.actions change failed action when initial state is 'hiding'", () => {
		const initialState: PageState = "hiding";
		const action = translations.actions.setLanguage.failed("pl", {
			from: "translation-provider",
			translationProviderId: "page",
			error: new Error("error")
		});

		const result = translationsReducer.pageState(initialState, action);

		expect(result).toEqual<PageState>("shown");
	});
});

describe("translationsReducer.loadingState reducer", () => {
	it("should register translation provider correctly", () => {
		const initialState = {};
		const action = translations.actions.registerTranslationProvider("page");

		const result = translationsReducer.loadingState(initialState, action);

		expect(result).toHaveProperty("page", false);
	});

	it("should register second translation provider correctly", () => {
		const initialState = { page: false };
		const action = translations.actions.registerTranslationProvider("contact");

		const result = translationsReducer.loadingState(initialState, action);

		expect(result).toEqual({ page: false, contact: false });
	});

	it("should not modify original state", () => {
		const initialState = { page: false };
		const action = translations.actions.registerTranslationProvider("contact");

		const result = translationsReducer.loadingState(initialState, action);

		expect(result).not.toBe(initialState);
	});

	it("should mark specified provider as loaded by translationProviderReady action", () => {
		const initialState = { page: false, contact: false };
		const action = translations.actions.translationProviderReady("contact");

		const result = translationsReducer.loadingState(initialState, action);

		expect(result).toEqual({ page: false, contact: true });
	});

	it("should reset states to true on translations.actions.setLanguage request action", () => {
		const initialState = { page: true, contact: true };
		const action = translations.actions.setLanguage.success("pl");

		const result = translationsReducer.loadingState(initialState, action);

		expect(result).toEqual({ page: true, contact: true });
	});

	it("should reset states to true on translations.actions.setLanguage failed action", () => {
		const initialState = { page: false, contact: false };
		const action = translations.actions.setLanguage.failed("pl", {
			from: "translation-provider",
			translationProviderId: "page",
			error: new Error("error")
		});

		const result = translationsReducer.loadingState(initialState, action);

		expect(result).toEqual({ page: true, contact: true });
	});

	it("should reset states to false on setLanuage request action", () => {
		const initialState = { page: true, contact: true };
		const action = translations.actions.setLanguage.request("pl");

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
		const action = translations.actions.setupAvailableLanguages(availableLanguages);

		const result = translationsReducer.availableLanguages(initialState, action);

		expect(result).toEqual(availableLanguages);
	});
});
