import { UseTranslation } from "next-i18next";

export function useTranslationMock(
	mockNamespace: string | string[] | undefined,
	mockTranslations: { [key: string]: string }
) {
	// eslint-disable-next-line @typescript-eslint/no-var-requires
	const { useTranslation } = require("~/utils/i18next");
	useTranslation.mockReset();

	const t = jest.fn().mockImplementation((key: string) => {
		const keys = Object.keys(mockTranslations);

		if (!keys.includes(key)) {
			throw new Error(
				`useTranslationMock: given key "${key}" is expected to be one of these ${keys}`
			);
		}

		return mockTranslations[key];
	});

	useTranslation.mockImplementation((ns: string | string[] | undefined) => {
		if (ns !== mockNamespace) {
			throw new Error(
				`useTranslationMock: expected namespace "${mockNamespace}" but got "${ns}"`
			);
		}

		return ({ t } as unknown) as ReturnType<UseTranslation>;
	});

	return { useTranslation, t };
}
