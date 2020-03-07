import { AvailableLanguage, Translations } from "../models";
import { createMock } from "ts-auto-mock";
import { setLanguage } from "../actions";
import { translationsReducer } from "../reducer";

describe("availableLanguages reducer", () => {
	it("should add missing translations from language/setLanguage/success action payload", () => {
		const stateMock: AvailableLanguage[] = [
			{ code: "en", name: "English", translations: createMock<Translations>() },
			{ code: "pl", name: "Polski", translations: undefined }
		];
		const polishTranslations = createMock<Translations>();

		const result = translationsReducer.availableLanguages(
			stateMock,
			setLanguage.success("pl", polishTranslations)
		);

		expect(result).toContainEqual({
			code: "pl",
			name: "Polski",
			translations: polishTranslations
		});
	});

	it("should not update state object if translation is alredy fetched", () => {
		const stateMock: AvailableLanguage[] = [
			{ code: "en", name: "English", translations: createMock<Translations>() },
			{ code: "pl", name: "Polski", translations: createMock<Translations>() }
		];

		const result = translationsReducer.availableLanguages(
			stateMock,
			setLanguage.success("pl", createMock<Translations>())
		);

		expect(result).toBe(stateMock);
	});

	it("should not change state when language is alredy defined and language/setLanguage/success payload.missingTranslations is undefined", () => {
		const stateMock: AvailableLanguage[] = [
			{ code: "en", name: "English", translations: createMock<Translations>() },
			{ code: "pl", name: "Polski", translations: createMock<Translations>() }
		];

		const result = translationsReducer.availableLanguages(
			stateMock,
			setLanguage.success("en", undefined)
		);

		expect(result).toEqual(stateMock);
	});

	it("should not change state when language is alredy defined and language/setLanguage/success payload.missingTranslations is null", () => {
		const stateMock: AvailableLanguage[] = [
			{ code: "en", name: "English", translations: createMock<Translations>() },
			{ code: "pl", name: "Polski", translations: createMock<Translations>() }
		];

		const result = translationsReducer.availableLanguages(
			stateMock,
			setLanguage.success("en", null)
		);

		expect(result).toBe(stateMock);
	});

	it("should not change state when given language code is unknown", () => {
		const stateMock: AvailableLanguage[] = [
			{ code: "en", name: "English", translations: createMock<Translations>() },
			{ code: "pl", name: "Polski", translations: createMock<Translations>() }
		];

		const result = translationsReducer.availableLanguages(
			stateMock,
			setLanguage.success("fr", createMock<Translations>())
		);

		expect(result).toBe(stateMock);
	});
});
