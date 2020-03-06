import { createActionCreator } from "deox";
import { Translations } from "./models";

export const setLanguage = {
	request: createActionCreator(
		"language/setLanguage/request",
		resolve => (languageCode: string) => resolve({ languageCode })
	),
	success: createActionCreator(
		"language/setLanguage/success",
		resolve => (languageCode: string, missingTranslations?: Translations) =>
			resolve({ languageCode }, { missingTranslations })
	),
	failed: createActionCreator(
		"language/setLanguage/failed",
		resolve => (languageCode: string, statusCode: number, response?: string) =>
			resolve({ languageCode }, { statusCode, response })
	),
	pageHideAnimationEnded: createActionCreator("language/setLanguage/pageHideAnimationEnd")
};
