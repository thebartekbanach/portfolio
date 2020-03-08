import { createActionCreator } from "deox";
import { PageState } from "./models";

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
	),
	pageHasBeenHidden: createActionCreator("translations/setLanguage/pageHasBeenHidden"),
	translationProviderReady: createActionCreator(
		"translations/setLanguage/translationProviderReady",
		resolve => (providerId: string) => resolve({ providerId })
	)
};

export const registerTranslationProvider = createActionCreator(
	"translations/registerTranslationProvider",
	resolve => (translationProviderId: string) => resolve({ translationProviderId })
);
