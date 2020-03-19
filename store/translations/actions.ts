import { AvailableLanguage } from "./models";
import { createActionCreator } from "deox";

type SetLanguageFailedActionCreatorErrorDetails =
	| {
			from: "translation-provider";
			translationProviderId: string;
			error: Error;
	  }
	| {
			from: "redux-saga";
			error: Error;
	  };

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
			languageCode: string | null,
			error: SetLanguageFailedActionCreatorErrorDetails
		) => resolve({ languageCode }, { error })
	)
};

export const pageHasBeenHidden = createActionCreator("translations/setLanguage/pageHasBeenHidden");

export const translationProviderReady = createActionCreator(
	"translations/setLanguage/translationProviderReady",
	resolve => (providerId: string) => resolve({ providerId })
);

export const registerTranslationProvider = createActionCreator(
	"translations/registerTranslationProvider",
	resolve => (translationProviderId: string) => resolve({ translationProviderId })
);

export const setupAvailableLanguages = createActionCreator(
	"translations/setupAvailableLanguages",
	resolve => (availableLanguages: AvailableLanguage[]) => resolve({ availableLanguages })
);
