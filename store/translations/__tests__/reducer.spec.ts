import { AvailableLanguage, Translations } from "../models";
import { createMock } from "ts-auto-mock";
import { setLanguage } from "../actions";
import { translationsReducer } from "../reducer";

describe("availableLanguages reducer", () => {
	it("should add missing translations from language/setLanguage/success action payload", () => {
		const stateMock: AvailableLanguage[] = [
			{ code: "en", translations: createMock<Translations>() }
		];
		const polishTranslations = createMock<Translations>();

		const result = translationsReducer.availableLanguages(
			stateMock,
			setLanguage.success("pl", polishTranslations)
		);

		expect(result).toContainEqual({
			code: "pl",
			translations: polishTranslations
		});
	});

	it("should not change state when language is alredy defined and language/setLanguage/success payload.missingTranslations is undefined", () => {
		const stateMock: AvailableLanguage[] = [
			{ code: "en", translations: createMock<Translations>() }
		];

		const result = translationsReducer.availableLanguages(
			stateMock,
			setLanguage.success("en", undefined)
		);

		expect(result).toBe(stateMock);
	});

	it("should not change state when language is alredy defined and language/setLanguage/success payload.missingTranslations is null", () => {
		const stateMock: AvailableLanguage[] = [
			{ code: "en", translations: createMock<Translations>() }
		];

		const result = translationsReducer.availableLanguages(
			stateMock,
			setLanguage.success("en", null)
		);

		expect(result).toBe(stateMock);
	});
});
