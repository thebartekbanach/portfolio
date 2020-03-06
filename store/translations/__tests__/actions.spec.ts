import { createMock } from "ts-auto-mock";
import { setLanguage } from "../actions";
import { Translations } from "../models";

describe("setLanguage request action creator", () => {
	it("should return proper payload object", () => {
		const result = setLanguage.request("pl");
		expect(result.payload).toEqual({ languageCode: "pl" });
	});
});

describe("setLanguage success action creator", () => {
	it("should return proper payload object", () => {
		const result = setLanguage.success("pl");
		expect(result.payload).toEqual({ languageCode: "pl" });
	});

	it("should return proper meta object", () => {
		const translationsMock = createMock<Translations>();

		const result = setLanguage.success("pl", translationsMock);

		expect(result.meta).toEqual({ missingTranslations: translationsMock });
	});

	it("should return undefined missingTranslations meta property if missingTranslations are not specified", () => {
		const result = setLanguage.success("pl");
		expect(result.meta).toEqual({ missingTranslations: undefined });
	});
});

describe("setLanguage failed action creator", () => {
	it("should return proper payload object", () => {
		const result = setLanguage.failed("pl", 404, "error");
		expect(result.payload).toEqual({ languageCode: "pl" });
	});

	it("should return proper meta object", () => {
		const result = setLanguage.failed("pl", 404, "error");
		expect(result.meta).toEqual({ statusCode: 404, response: "error" });
	});

	it("should return meta property with undefined response if no reponse specified", () => {
		const result = setLanguage.failed("pl", 404);
		expect(result.meta.response).toBe(undefined);
	});
});
