import { AvailableLanguage, LoadingState, PageState } from "./models";
import { combineReducers } from "redux";
import { createReducer } from "deox";
import { translations } from ".";

const currentLanguageCode = createReducer("en", handleAction => [
	handleAction(translations.actions.setLanguage.success, (state, { payload }) => {
		if (payload.newLanguageCode === state) {
			return state;
		}

		return payload.newLanguageCode;
	})
]);

const pendingLanguageCode = createReducer(null as string | null, handleAction => [
	handleAction(translations.actions.setLanguage.request, (state, { payload }) => {
		if (state !== null) {
			return state;
		}

		return payload.languageCode;
	}),
	handleAction(
		[translations.actions.setLanguage.success, translations.actions.setLanguage.failed],
		() => {
			return null;
		}
	)
]);

const registeredTranslationProviders = createReducer([] as string[], handleAction => [
	handleAction(translations.actions.registerTranslationProvider, (state, { payload }) => {
		if (state.includes(payload.translationProviderId)) {
			return state;
		}

		return [...state, payload.translationProviderId];
	})
]);

const loadingState = createReducer({} as LoadingState, handleAction => [
	handleAction(translations.actions.registerTranslationProvider, (state, { payload }) => {
		const result = { ...state };

		result[payload.translationProviderId] = false;

		return result;
	}),
	handleAction(translations.actions.setLanguage.request, state => {
		const result = {};

		for (const prop in state) {
			result[prop] = false;
		}

		return result;
	}),
	handleAction(translations.actions.translationProviderReady, (state, { payload }) => {
		const result = { ...state };

		for (const prop in state) {
			if (prop === payload.providerId) {
				result[prop] = true;
				break;
			}
		}

		return result;
	}),
	handleAction(translations.actions.setLanguage.failed, state => {
		const result = {};

		for (const prop in state) {
			result[prop] = true;
		}

		return result;
	})
]);

const pageState = createReducer("shown" as PageState, handleAction => [
	handleAction(translations.actions.setLanguage.request, () => "hiding"),
	handleAction(translations.actions.setLanguage.success, () => "shown"),
	handleAction(translations.actions.setLanguage.failed, () => "shown"),
	handleAction(translations.actions.pageHasBeenHidden, () => "hidden")
]);

const availableLanguages = createReducer([] as AvailableLanguage[], handleAction => [
	handleAction(
		translations.actions.setupAvailableLanguages,
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
