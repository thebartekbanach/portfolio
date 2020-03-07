import { translate, TypedTranslation } from "../translate";

describe("translate function", () => {
	interface SomeSimpleTranslation {
		aboutMe: TypedTranslation<{ age: number }>;
	}

	interface SomeAdvancedTranslation {
		aboutMe: TypedTranslation<{ name: string; age: number }>;
	}

	it("should translate string with single parameter occurrence", () => {
		const translation: SomeSimpleTranslation = { aboutMe: "before {age} after" };
		const parameters = { age: 20 };

		const translatedText = translate(translation.aboutMe, parameters);

		expect(translatedText).toEqual("before 20 after");
	});

	it("should translate string with multiple parameter occurrences", () => {
		const translation: SomeSimpleTranslation = {
			aboutMe: "first {age} second {age} third {age}"
		};
		const parameters = { age: 20 };

		const translatedText = translate(translation.aboutMe, parameters);

		expect(translatedText).toEqual("first 20 second 20 third 20");
	});

	it("should translate string with two different parameters", () => {
		const translation: SomeAdvancedTranslation = { aboutMe: "name: {name}, age: {age}" };
		const parameters = { age: 20, name: "Bartek" };

		const translatedText = translate(translation.aboutMe, parameters);

		expect(translatedText).toEqual("name: Bartek, age: 20");
	});

	it("should translate string with multiple occurrences of two different parameters", () => {
		const translation: SomeAdvancedTranslation = {
			aboutMe: "name: {name}, age: {age}; Hello my name is {name} and I am {age} years old"
		};
		const parameters = { name: "Bartek", age: 20 };

		const translatedText = translate(translation.aboutMe, parameters);

		expect(translatedText).toEqual(
			"name: Bartek, age: 20; Hello my name is Bartek and I am 20 years old"
		);
	});

	it("should throw error when parameters object is undefined", () => {
		const translation: SomeSimpleTranslation = { aboutMe: "before {age} after" };
		const parameters = undefined;

		expect(() => translate(translation.aboutMe, parameters)).toThrowError(
			"params cannot be null or undefined"
		);
	});

	it("should throw error when parameters object is null", () => {
		const translation: SomeSimpleTranslation = { aboutMe: "before {age} after" };
		const parameters = null;

		expect(() => translate(translation.aboutMe, parameters)).toThrowError(
			"params cannot be null or undefined"
		);
	});

	it("should throw error when translation object is undefined", () => {
		const translation: SomeSimpleTranslation = { aboutMe: undefined };
		const parameters = { age: 20 };

		expect(() => translate(translation.aboutMe, parameters)).toThrowError(
			"text cannot be null or undefined"
		);
	});

	it("should throw error when translation object is null", () => {
		const translation: SomeSimpleTranslation = { aboutMe: null };
		const parameters = { age: 20 };

		expect(() => translate(translation.aboutMe, parameters)).toThrowError(
			"text cannot be null or undefined"
		);
	});

	it("should throw error when translation object is undefined and parameters is undefined", () => {
		const translation: SomeSimpleTranslation = { aboutMe: undefined };
		const parameters = undefined;

		expect(() => translate(translation.aboutMe, parameters)).toThrowError(
			"text cannot be null or undefined"
		);
	});

	it("should throw error when translation object is undefined and parameters is null", () => {
		const translation: SomeSimpleTranslation = { aboutMe: undefined };
		const parameters = null;

		expect(() => translate(translation.aboutMe, parameters)).toThrowError(
			"text cannot be null or undefined"
		);
	});

	it("should throw error when translation object is null and parameters is undefined", () => {
		const translation: SomeSimpleTranslation = { aboutMe: null };
		const parameters = undefined;

		expect(() => translate(translation.aboutMe, parameters)).toThrowError(
			"text cannot be null or undefined"
		);
	});

	it("should throw error when translation object is null and parameters is null", () => {
		const translation: SomeSimpleTranslation = { aboutMe: null };
		const parameters = null;

		expect(() => translate(translation.aboutMe, parameters)).toThrowError(
			"text cannot be null or undefined"
		);
	});

	it("should throw error when translation is not string", () => {
		const translation = () => "functions should not work";
		const parameters = { age: 20 };

		expect(() => translate(translation as any, parameters)).toThrowError(
			"text must be an instance of the string"
		);
	});

	it("should throw error when parameters contain function", () => {
		const translation: SomeSimpleTranslation = { aboutMe: "before {age} after" };
		const parameters = { age: (() => 20) as any };

		expect(() => translate(translation.aboutMe, parameters)).toThrowError(
			"params cannot contain a function or nested object"
		);
	});

	it("should throw error when parameters contain object", () => {
		const translation: SomeSimpleTranslation = { aboutMe: "before {age} after" };
		const parameters = { age: { age: 20 } as any };

		expect(() => translate(translation.aboutMe, parameters)).toThrowError(
			"params cannot contain a function or nested object"
		);
	});
});
