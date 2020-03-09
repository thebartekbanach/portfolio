import { AvailableLanguage } from "./models";
import { createActionCreator } from "deox";

export const setLanguage = {
	request: createActionCreator(
		"translations/setLanguage/request",
		resolve => (languageCode: string) => resolve({ languageCode })
	),
	success: createActionCreator(
		"translations/setLanguage/success",
		resolve => (newLanguageCode: string) => resolve({ newLanguageCode })
	),
	failed: createActionCreator(
		"translations/setLanguage/failed",
		resolve => (
			languageCode: string,
			translationProviderId: string,
			statusCode: number,
			response?: string
		) => resolve({ languageCode }, { translationProviderId, statusCode, response })
	)
};

const pageHasBeenHidden = createActionCreator("translations/setLanguage/pageHasBeenHidden");

const translationProviderReady = createActionCreator(
	"translations/setLanguage/translationProviderReady",
	resolve => (providerId: string) => resolve({ providerId })
);

const registerTranslationProvider = createActionCreator(
	"translations/registerTranslationProvider",
	resolve => (translationProviderId: string) => resolve({ translationProviderId })
);

const setupAvailableLanguages = createActionCreator(
	"translations/setupAvailableLanguages",
	resolve => (availableLanguages: AvailableLanguage[]) => resolve({ availableLanguages })
);

export const language = {
	setupAvailableLanguages,
	registerTranslationProvider,
	setLanguage,
	translationProviderReady,
	pageHasBeenHidden
};
