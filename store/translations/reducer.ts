import { AvailableLanguage, LoadingState, PageState } from "./models";
import { combineReducers } from "redux";
import { createReducer } from "deox";
import { language } from "./actions";

const currentLanguageCode = createReducer("en", handleAction => [
	handleAction(language.setLanguage.success, (state, { payload }) => {
		if (payload.newLanguageCode === state) {
			return state;
		}

		return payload.newLanguageCode;
	})
]);

const pendingLanguageCode = createReducer(undefined as string | undefined, handleAction => [
	handleAction(language.setLanguage.request, (state, { payload }) => {
		if (state !== undefined) {
			return state;
		}

		return payload.languageCode;
	}),
	handleAction([language.setLanguage.success, language.setLanguage.failed], () => {
		return undefined;
	})
]);

const registeredTranslationProviders = createReducer([] as string[], handleAction => [
	handleAction(language.registerTranslationProvider, (state, { payload }) => {
		if (state.includes(payload.translationProviderId)) {
			return state;
		}

		return [...state, payload.translationProviderId];
	})
]);

const loadingState = createReducer({} as LoadingState, handleAction => [
	handleAction(language.registerTranslationProvider, (state, { payload }) => {
		const result = { ...state };

		result[payload.translationProviderId] = false;

		return result;
	}),
	handleAction(language.setLanguage.request, state => {
		const result = {};

		for (const prop in state) {
			result[prop] = false;
		}

		return result;
	}),
	handleAction(language.translationProviderReady, (state, { payload }) => {
		const result = { ...state };

		for (const prop in state) {
			if (prop === payload.providerId) {
				result[prop] = true;
				break;
			}
		}

		return result;
	}),
	handleAction(language.setLanguage.failed, state => {
		const result = {};

		for (const prop in state) {
			result[prop] = true;
		}

		return result;
	})
]);

const pageState = createReducer("shown" as PageState, handleAction => [
	handleAction(language.setLanguage.request, () => "hiding"),
	handleAction(language.setLanguage.success, () => "shown"),
	handleAction(language.setLanguage.failed, () => "shown"),
	handleAction(language.pageHasBeenHidden, () => "hidden")
]);

const availableLanguages = createReducer([] as AvailableLanguage[], handleAction => [
	handleAction(
		language.setupAvailableLanguages,
		(state, action) => action.payload.availableLanguages
	)
]);

export const translationsReducer = {
	availableLanguages,
	currentLanguageCode,
	pendingLanguageCode,
	registeredTranslationProviders,
	loadingState,
	pageState
};

export default combineReducers(translationsReducer);
