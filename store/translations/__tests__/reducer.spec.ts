import { LoadingState, PageState } from "../models";
import { registerTranslationProvider, setLanguage } from "../actions";
import { translationsReducer } from "../reducer";

describe("translationsReducer.registeredTranslationProviders reducer", () => {
	it("should add new translation provider id", () => {
		const initialState = [];
		const action = registerTranslationProvider("page");

		const result = translationsReducer.registeredTranslationProviders(initialState, action);

		expect(result).toContainEqual("page");
	});

	it("should not mutate state", () => {
		const initialState = ["page"];
		const action = registerTranslationProvider("contact");

		const result = translationsReducer.registeredTranslationProviders(initialState, action);

		expect(result).not.toBe(initialState);
	});

	it("should add new translation provider and leave existing ones", () => {
		const initialState = ["page"];
		const action = registerTranslationProvider("contact");

		const result = translationsReducer.registeredTranslationProviders(initialState, action);

		expect(result).toEqual(["page", "contact"]);
	});

	it("should not add existing translation provider id", () => {
		const initialState = ["page"];
		const action = registerTranslationProvider("page");

		const result = translationsReducer.registeredTranslationProviders(initialState, action);

		expect(result).toBe(initialState);
	});

	it("should not add null translation provider id", () => {
		const initialState = ["page"];
		const action = registerTranslationProvider(null);

		const result = translationsReducer.registeredTranslationProviders(initialState, action);

		expect(result).toBe(initialState);
	});

	it("should not add undefined translation provider id", () => {
		const initialState = ["page"];
		const action = registerTranslationProvider(undefined);

		const result = translationsReducer.registeredTranslationProviders(initialState, action);

		expect(result).toBe(initialState);
	});
});

describe("translationsReducer.pendingLanguageCode reducer", () => {
	it("should set pending language to requested language", () => {
		const initialState = undefined;
		const action = setLanguage.request("pl");

		const result = translationsReducer.pendingLanguageCode(initialState, action);

		expect(result).toEqual("pl");
	});

	it("should not change pending language when is already loading", () => {
		const initialState = "pl";
		const action = setLanguage.request("en");

		const result = translationsReducer.pendingLanguageCode(initialState, action);

		expect(result).toBe(initialState);
	});

	it("should not change pending language to null", () => {
		const initialState = undefined;
		const action = setLanguage.request(null);

		const result = translationsReducer.pendingLanguageCode(initialState, action);

		expect(result).toBe(initialState);
	});

	it("should set pending language to undefined after success", () => {
		const initialState = "pl";
		const action = setLanguage.success("pl");

		const result = translationsReducer.pendingLanguageCode(initialState, action);

		expect(result).toBe(undefined);
	});

	it("should set pending language to undefined after failure", () => {
		const initialState = "pl";
		const action = setLanguage.failed("pl", "page", 500);

		const result = translationsReducer.pendingLanguageCode(initialState, action);

		expect(result).toBe(undefined);
	});
});

describe("translationsReducer.currentLanguageCode reducer", () => {
	it("should set current language after success", () => {
		const initialState = "pl";
		const action = setLanguage.success("en");

		const result = translationsReducer.currentLanguageCode(initialState, action);

		expect(result).toEqual("en");
	});

	it("should not change current language after success to null", () => {
		const initialState = "pl";
		const action = setLanguage.success(null);

		const result = translationsReducer.currentLanguageCode(initialState, action);

		expect(result).toBe(initialState);
	});

	it("should not change current language after success to undefined", () => {
		const initialState = "pl";
		const action = setLanguage.success(undefined);

		const result = translationsReducer.currentLanguageCode(initialState, action);

		expect(result).toBe(initialState);
	});

	it("should not change state if language code is the same", () => {
		const initialState = "pl";
		const action = setLanguage.success("pl");

		const result = translationsReducer.currentLanguageCode(initialState, action);

		expect(result).toBe(initialState);
	});
});

describe("translationsReducer.pageState reducer", () => {
	it("should change state to 'hiding' after language change request action", () => {
		const initialState: PageState = "shown";
		const action = setLanguage.request("pl");

		const result = translationsReducer.pageState(initialState, action);

		expect(result).toEqual<PageState>("hiding");
	});

	it("should change state to 'hidden' after pageHasBeenHidden action", () => {
		const initialState: PageState = "hiding";
		const action = setLanguage.pageHasBeenHidden();

		const result = translationsReducer.pageState(initialState, action);

		expect(result).toEqual<PageState>("hidden");
	});

	it("should change state to 'shown' after language change success action", () => {
		const initialState: PageState = "hidden";
		const action = setLanguage.success("pl");

		const result = translationsReducer.pageState(initialState, action);

		expect(result).toEqual<PageState>("shown");
	});

	it("should change state to 'shown' after language change failed action when initial state is 'hidden'", () => {
		const initialState: PageState = "hidden";
		const action = setLanguage.failed("pl", "page", 500);

		const result = translationsReducer.pageState(initialState, action);

		expect(result).toEqual<PageState>("shown");
	});

	it("should change state to 'shown' after language change failed action when initial state is 'hiding'", () => {
		const initialState: PageState = "hiding";
		const action = setLanguage.failed("pl", "page", 500);

		const result = translationsReducer.pageState(initialState, action);

		expect(result).toEqual<PageState>("shown");
	});

	it("should not change state if request action is called with null as language code", () => {
		const initialState: PageState = "shown";
		const action = setLanguage.request(null);

		const result = translationsReducer.pageState(initialState, action);

		expect(result).toBe(initialState);
	});

	it("should not change state if request action is called with undefined as language code", () => {
		const initialState: PageState = "shown";
		const action = setLanguage.request(undefined);

		const result = translationsReducer.pageState(initialState, action);

		expect(result).toBe(initialState);
	});

	it("should not change state if success action is called with null as language code", () => {
		const initialState: PageState = "hidden";
		const action = setLanguage.success(null);

		const result = translationsReducer.pageState(initialState, action);

		expect(result).toBe(initialState);
	});

	it("should not change state if success action is called with undefined as language code", () => {
		const initialState: PageState = "hidden";
		const action = setLanguage.success(undefined);

		const result = translationsReducer.pageState(initialState, action);

		expect(result).toBe(initialState);
	});

	it("should not change state if failed action is called with null as language code", () => {
		const initialState: PageState = "hidden";
		const action = setLanguage.failed(null, "page", 500);

		const result = translationsReducer.pageState(initialState, action);

		expect(result).toBe(initialState);
	});

	it("should not change state if failed action is called with undefined as language code", () => {
		const initialState: PageState = "hidden";
		const action = setLanguage.failed(undefined, "page", 500);

		const result = translationsReducer.pageState(initialState, action);

		expect(result).toBe(initialState);
	});
});

describe("translationsReducer.loadingState reducer", () => {
	it("should register translation provider correctly", () => {
		const initialState = {};
		const action = registerTranslationProvider("page");

		const result = translationsReducer.loadingState(initialState, action);

		expect(result).toHaveProperty("page", false);
	});

	it("should register second translation provider correctly", () => {
		const initialState = { page: false };
		const action = registerTranslationProvider("contact");

		const result = translationsReducer.loadingState(initialState, action);

		expect(result).toEqual({ page: false, contact: false });
	});

	it("should not modify original state", () => {
		const initialState = { page: false };
		const action = registerTranslationProvider("contact");

		const result = translationsReducer.loadingState(initialState, action);

		expect(result).not.toBe(initialState);
	});

	it.each([[null], [undefined]])(
		"should not modify state if register translation provider event is (%s)",
		nullOrUndefined => {
			const initialState = { page: false };
			const action = registerTranslationProvider(nullOrUndefined);

			const result = translationsReducer.loadingState(initialState, action);

			expect(result).toBe(initialState);
		}
	);

	it("should mark specified provider as loaded by translationProviderReady action", () => {
		const initialState = { page: false, contact: false };
		const action = setLanguage.translationProviderReady("contact");

		const result = translationsReducer.loadingState(initialState, action);

		expect(result).toEqual({ page: false, contact: true });
	});

	it("should reset states to true on setLanguage request action", () => {
		const initialState = { page: true, contact: true };
		const action = setLanguage.success("pl");

		const result = translationsReducer.loadingState(initialState, action);

		expect(result).toEqual({ page: true, contact: true });
	});

	it("should reset states to true on setLanguage failed action", () => {
		const initialState = { page: false, contact: false };
		const action = setLanguage.failed("pl", "contact", 500);

		const result = translationsReducer.loadingState(initialState, action);

		expect(result).toEqual({ page: true, contact: true });
	});
});
