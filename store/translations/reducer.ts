import { AvailableLanguage } from "./models";
import { createReducer } from "deox";
import { setLanguage } from "./actions";

const availableLanguages = createReducer([] as AvailableLanguage[], handleAction => [
	handleAction(setLanguage.success, (state, action) => {
		if (
			action.payload.missingTranslations === undefined ||
			action.payload.missingTranslations === null
		) {
			return state;
		}

		const language = state.find(lang => lang.code == action.payload.languageCode);

		if (language === undefined) {
			return state;
		}

		const missingLanguage: AvailableLanguage = {
			code: action.payload.languageCode,
			name: language.name,
			translations: action.payload.missingTranslations
		};

		return [
			...state.filter(lang => lang.code === action.payload.languageCode),
			missingLanguage
		];
	})
]);

const currentLanguageCode = createReducer("en", handleAction => []);

const pendingLanguageCode = createReducer(undefined as string, handleAction => []);

const pageIsHidden = createReducer(false, handleAction => []);

export const translationsReducer = {
	availableLanguages,
	currentLanguageCode,
	pendingLanguageCode,
	pageIsHidden
};
