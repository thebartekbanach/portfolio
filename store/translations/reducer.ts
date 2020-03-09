import { createReducer } from "deox";
import { LoadingState, PageState } from "./models";
import { registerTranslationProvider, setLanguage } from "./actions";

const currentLanguageCode = createReducer("en", handleAction => [
	handleAction(setLanguage.success, (state, { payload }) => {
		if (payload.newLanguageCode === state) {
			return state;
		}

		return payload.newLanguageCode;
	})
]);

const pendingLanguageCode = createReducer(undefined as string | undefined, handleAction => [
	handleAction(setLanguage.request, (state, { payload }) => {
		if (state !== undefined) {
			return state;
		}

		return payload.languageCode;
	}),
	handleAction([setLanguage.success, setLanguage.failed], () => {
		return undefined;
	})
]);

const registeredTranslationProviders = createReducer([] as string[], handleAction => [
	handleAction(registerTranslationProvider, (state, { payload }) => {
		if (state.includes(payload.translationProviderId)) {
			return state;
		}

		return [...state, payload.translationProviderId];
	})
]);

const loadingState = createReducer({} as LoadingState, handleAction => [
	handleAction(registerTranslationProvider, (state, { payload }) => {
		const result = { ...state };

		result[payload.translationProviderId] = false;

		return result;
	}),
	handleAction(setLanguage.request, state => {
		const result = {};

		for (const prop in state) {
			result[prop] = false;
		}

		return result;
	}),
	handleAction(setLanguage.translationProviderReady, (state, { payload }) => {
		const result = { ...state };

		for (const prop in state) {
			if (prop === payload.providerId) {
				result[prop] = true;
				break;
			}
		}

		return result;
	}),
	handleAction(setLanguage.failed, state => {
		const result = {};

		for (const prop in state) {
			result[prop] = true;
		}

		return result;
	})
]);

const pageState = createReducer("shown" as PageState, handleAction => [
	handleAction(setLanguage.request, () => "hiding"),
	handleAction(setLanguage.success, () => "shown"),
	handleAction(setLanguage.failed, () => "shown"),
	handleAction(setLanguage.pageHasBeenHidden, () => "hidden")
]);

export const translationsReducer = {
	currentLanguageCode,
	pendingLanguageCode,
	registeredTranslationProviders,
	loadingState,
	pageState
};
