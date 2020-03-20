import { select, call, race } from "../testEffectsProviders";
import { translations } from "~/store/translations";
import * as effects from "~/lib/sagaEffects";

describe("testEffectsProviders", () => {
	describe("select", () => {
		it("should create correct effect provider", () => {
			const mock = jest.fn().mockReturnValue("ok");
			const selector = translations.selectors.pendingLanguageCode;

			const result = select(selector).mockedBy(mock);

			expect(typeof result.select).toEqual("function");
		});

		it("should return mock() if selector is matched", () => {
			const mock = jest.fn().mockReturnValue("ok");
			const selector = translations.selectors.pendingLanguageCode;

			const provider = select(selector).mockedBy(mock);
			const result = provider.select({ selector }, () => {});

			expect(result).toEqual("ok");
			expect(mock).toBeCalled();
		});

		it("should return next() if selector does not match", () => {
			const mock = jest.fn().mockReturnValue("ok");
			const next = jest.fn().mockReturnValue("next value");
			const selector = translations.selectors.pendingLanguageCode;
			const otherSelector = translations.selectors.isPageHidden;

			const provider = select(selector).mockedBy(mock);
			const result = provider.select({ selector: otherSelector }, next);

			expect(result).toEqual("next value");
			expect(mock).not.toBeCalled();
			expect(next).toBeCalled();
		});
	});

	describe("call", () => {
		it("should create correct effect provider", () => {
			const mock = jest.fn().mockReturnValue("ok");
			const func = () => "to mock";

			const result = call(func).mockedBy(mock);

			expect(typeof result.call).toEqual("function");
		});

		it("should return mock() if call is matched", () => {
			const mock = jest.fn().mockReturnValue("ok");
			const next = jest.fn();
			const func = (str: string, num: number) => str + num;

			const caller = call(func, "arg", 1234).mockedBy(mock);
			const result = caller.call({ fn: func, args: ["arg", 1234] }, next);

			expect(result).toEqual("ok");
			expect(mock).toBeCalled();
			expect(next).not.toBeCalled();
		});

		it("should return next() if call does not match", () => {
			const mock = jest.fn().mockReturnValue("ok");
			const next = jest.fn().mockReturnValue("next value");
			const func = (str: string, num: number) => str + num;
			const otherFunc = (str: string, num: number) => num + str;

			const provider = call(func, "arg", 1234).mockedBy(mock);
			const result = provider.call({ fn: otherFunc, args: ["wrong", 5678] }, next);

			expect(result).toEqual("next value");
			expect(mock).not.toBeCalled();
			expect(next).toBeCalled();
		});

		it("should not call mock() if arguments are not equal", () => {
			const mock = jest.fn().mockReturnValue("ok");
			const next = jest.fn().mockReturnValue("next value");
			const func = (str: string, num: number) => str + num;

			const provider = call(func, "arg", 1234).mockedBy(mock);
			const result = provider.call({ fn: func, args: ["wrong", 5678] }, next);

			expect(result).toEqual("next value");
			expect(mock).not.toBeCalled();
			expect(next).toBeCalled();
		});

		it("should not call mock() if fn is not equal", () => {
			const mock = jest.fn().mockReturnValue("ok");
			const next = jest.fn().mockReturnValue("next value");
			const func = (str: string, num: number) => str + num;
			const otherFunc = (str: string, num: number) => num + str;

			const provider = call(func, "arg", 1234).mockedBy(mock);
			const result = provider.call({ fn: otherFunc, args: ["arg", 1234] }, next);

			expect(result).toEqual("next value");
			expect(mock).not.toBeCalled();
			expect(next).toBeCalled();
		});
	});

	describe("race", () => {
		it("should call mock() if parameters are equal", () => {
			const mock = jest.fn().mockReturnValue("ok");
			const next = jest.fn().mockReturnValue("next value");
			const fakeApi = jest.fn().mockReturnValue("fakeApi");
			const params = {
				value: effects.race.call(fakeApi),
				timeout: effects.delay(100)
			};
			const testParams = {
				value: effects.race.call(fakeApi),
				timeout: effects.delay(100)
			};

			const provider = race(params).mockedBy(mock);
			const result = provider.race(testParams, next);

			expect(result).toEqual("ok");
			expect(mock).toBeCalled();
			expect(next).not.toBeCalled();
		});

		it("should call next() if parameters are not equal", () => {
			const mock = jest.fn().mockReturnValue("ok");
			const next = jest.fn().mockReturnValue("next value");
			const fakeApi = jest.fn().mockReturnValue("fakeApi");
			const otherApi = jest.fn().mockReturnValue("otherApi");
			const params = {
				value: effects.race.call(fakeApi),
				timeout: effects.delay(100)
			};
			const testParams = {
				value: effects.race.call(otherApi),
				timeout: effects.delay(5000)
			};

			const provider = race(params).mockedBy(mock);
			const result = provider.race(testParams, next);

			expect(result).toEqual("next value");
			expect(next).toBeCalled();
			expect(mock).not.toBeCalled();
		});
	});
});
