import { select } from "../testEffectsProviders";
import { translations } from "~/store/translations";

describe("testEffectsProviders", () => {
	describe("select", () => {
		it("should create correct effect provider", () => {
			const mock = jest.fn().mockReturnValue("ok");
			const selector = translations.selectors.pendingLanguageCode;

			const result = select(selector, mock);

			expect(typeof result.select).toEqual("function");
		});

		it("should return mock() if selector is matched", () => {
			const mock = jest.fn().mockReturnValue("ok");
			const selector = translations.selectors.pendingLanguageCode;

			const provider = select(selector, mock);
			const result = provider.select({ selector }, () => {});

			expect(result).toEqual("ok");
			expect(mock).toBeCalled();
		});

		it("should return next() if selector does not match", () => {
			const mock = jest.fn().mockReturnValue("ok");
			const next = jest.fn().mockReturnValue("next value");
			const selector = translations.selectors.pendingLanguageCode;
			const otherSelector = translations.selectors.isPageHidden;

			const provider = select(selector, mock);
			const result = provider.select({ selector: otherSelector }, next);

			expect(result).toEqual("next value");
			expect(mock).not.toBeCalled();
			expect(next).toBeCalled();
		});
	});
});
