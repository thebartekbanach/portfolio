/* eslint-disable @typescript-eslint/no-explicit-any */
import { select, call, race, take } from "../testEffectsProviders";
import * as effects from "~/utils/sagaEffects";
import { channel } from "redux-saga";

describe("testEffectsProviders", () => {
	describe("select", () => {
		describe("mockedBy", () => {
			it("should create correct effect provider", () => {
				const mock = jest.fn().mockReturnValue("ok");
				const selector = (store: any) => store.someState;

				const result = select(selector).mockedBy(mock);

				expect(typeof result.select).toEqual("function");
			});

			it("should return mock() if selector is matched", () => {
				const mock = jest.fn().mockReturnValue("ok");
				const selector = (store: any) => store.someState;

				const provider = select(selector).mockedBy(mock);
				// eslint-disable-next-line @typescript-eslint/no-empty-function
				const result = provider.select({ selector }, () => {});

				expect(result).toEqual("ok");
				expect(mock).toBeCalled();
			});

			it("should return next() if selector does not match", () => {
				const mock = jest.fn().mockReturnValue("ok");
				const next = jest.fn().mockReturnValue("next value");
				const selector = (store: any) => store.someState;
				const otherSelector = (store: any) => store.someOtherState;

				const provider = select(selector).mockedBy(mock);
				const result = provider.select({ selector: otherSelector }, next);

				expect(result).toEqual("next value");
				expect(mock).not.toBeCalled();
				expect(next).toBeCalled();
			});
		});

		describe("usingNameMockedBy", () => {
			it("should create correct effect provider", () => {
				const mock = jest.fn().mockReturnValue("ok");
				const selector = (store: any) => store.someState;

				const result = select(selector).usingNameMockedBy(mock);

				expect(typeof result.select).toEqual("function");
			});

			it("should return mock() if selector is matched", () => {
				const mock = jest.fn().mockReturnValue("ok");
				const selectorA = (param: any) =>
					function x(store: any) {
						return store.someState + param;
					};
				const selectorB = (param: any) =>
					function x(store: any) {
						return store.someOtherState + param;
					};

				const provider = select(selectorA({})).usingNameMockedBy(mock);
				// eslint-disable-next-line @typescript-eslint/no-empty-function
				const result = provider.select({ selector: selectorB(2137) }, () => {});

				expect(result).toEqual("ok");
				expect(mock).toBeCalled();
			});

			it("should return next() if selector does not match", () => {
				const mock = jest.fn().mockReturnValue("ok");
				const next = jest.fn().mockReturnValue("next value");
				const selectorA = (param: any) =>
					function x(store: any) {
						return store.someState + param;
					};
				const selectorB = (param: any) =>
					function y(store: any) {
						return store.someOtherState + param;
					};

				const provider = select(selectorA("should fail")).usingNameMockedBy(mock);
				const result = provider.select({ selector: selectorB(2137) }, next);

				expect(result).toEqual("next value");
				expect(mock).not.toBeCalled();
				expect(next).toBeCalled();
			});
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

	describe("take", () => {
		it("should return mock value if take pattern matches", () => {
			const mock = jest.fn().mockReturnValue("ok");
			const next = jest.fn().mockReturnValue("next value");
			const pattern = "some/pattern";
			const testPattern = "some/pattern";

			const provider = take(pattern).mockedBy(mock);
			const result = provider.take({ pattern: testPattern }, next);

			expect(result).toEqual("ok");
			expect(mock).toBeCalled();
			expect(next).not.toBeCalled();
		});

		it("should return mock value if take pattern array matches", () => {
			const mock = jest.fn().mockReturnValue("ok");
			const next = jest.fn().mockReturnValue("next value");
			const pattern = ["some/action", "second/action"];
			const testPattern = ["some/action", "second/action"];

			const provider = take(pattern).mockedBy(mock);
			const result = provider.take({ pattern: testPattern }, next);

			expect(result).toEqual("ok");
			expect(mock).toBeCalled();
			expect(next).not.toBeCalled();
		});

		it("should return mock value even if take pattern array is not in exact order", () => {
			const mock = jest.fn().mockReturnValue("ok");
			const next = jest.fn().mockReturnValue("next value");
			const pattern = ["some/action", "second/action"];
			const testPattern = ["second/action", "some/action"];

			const provider = take(pattern).mockedBy(mock);
			const result = provider.take({ pattern: testPattern }, next);

			expect(result).toEqual("ok");
			expect(mock).toBeCalled();
			expect(next).not.toBeCalled();
		});

		it("should return next if pattern does not match", () => {
			const mock = jest.fn().mockReturnValue("ok");
			const next = jest.fn().mockReturnValue("next value");
			const pattern = "some/pattern";
			const testPattern = "some/other/pattern";

			const provider = take(pattern).mockedBy(mock);
			const result = provider.take({ pattern: testPattern }, next);

			expect(result).toEqual("next value");
			expect(next).toBeCalled();
			expect(mock).not.toBeCalled();
		});

		it("should return next if pattern array has missing actions", () => {
			const mock = jest.fn().mockReturnValue("ok");
			const next = jest.fn().mockReturnValue("next value");
			const pattern = ["some/action", "second/action"];
			const testPattern = ["some/action"];

			const provider = take(pattern).mockedBy(mock);
			const result = provider.take({ pattern: testPattern }, next);

			expect(result).toEqual("next value");
			expect(next).toBeCalled();
			expect(mock).not.toBeCalled();
		});

		it("should return next if pattern array has more actions than expected", () => {
			const mock = jest.fn().mockReturnValue("ok");
			const next = jest.fn().mockReturnValue("next value");
			const pattern = ["some/action", "second/action"];
			const testPattern = ["some/action", "second/action", "third/action"];

			const provider = take(pattern).mockedBy(mock);
			const result = provider.take({ pattern: testPattern }, next);

			expect(result).toEqual("next value");
			expect(next).toBeCalled();
			expect(mock).not.toBeCalled();
		});

		it("should return next if take config and given pattern are not the same string type", () => {
			const mock = jest.fn().mockReturnValue("ok");
			const next = jest.fn().mockReturnValue("next value");
			const pattern = "some/action";
			const testPattern = ["some/action", "second/action"];

			const provider = take(pattern).mockedBy(mock);
			const result = provider.take({ pattern: testPattern }, next);

			expect(result).toEqual("next value");
			expect(next).toBeCalled();
			expect(mock).not.toBeCalled();
		});

		it("should return next if take config and given pattern are not the same array type", () => {
			const mock = jest.fn().mockReturnValue("ok");
			const next = jest.fn().mockReturnValue("next value");
			const pattern = ["some/action", "second/action"];
			const testPattern = "some/action";

			const provider = take(pattern).mockedBy(mock);
			const result = provider.take({ pattern: testPattern }, next);

			expect(result).toEqual("next value");
			expect(next).toBeCalled();
			expect(mock).not.toBeCalled();
		});

		it("should return mock if provided channel is correct", () => {
			const mock = jest.fn().mockReturnValue("ok");
			const next = jest.fn().mockReturnValue("next value");
			const ch = channel();

			const provider = take(ch).mockedBy(mock);
			const result = provider.take({ channel: ch }, next);

			expect(result).toEqual("ok");
			expect(mock).toBeCalled();
			expect(next).not.toBeCalled();
		});

		it("should return next if provided channel is not correct", () => {
			const mock = jest.fn().mockReturnValue("ok");
			const next = jest.fn().mockReturnValue("next value");
			const ch1 = channel();
			const ch2 = channel();

			const provider = take(ch1).mockedBy(mock);
			const result = provider.take({ channel: ch2 }, next);

			expect(result).toEqual("next value");
			expect(next).toBeCalled();
			expect(mock).not.toBeCalled();
		});
	});
});
