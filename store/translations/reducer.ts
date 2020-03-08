import { createReducer } from "deox";
import { LoadingState, PageState } from "./models";
import { registerTranslationProvider, setLanguage } from "./actions";

const currentLanguageCode = createReducer("en", handleAction => [
	handleAction(setLanguage.success, (state, action) => {
		if (
			action.payload.newLanguageCode === undefined ||
			action.payload.newLanguageCode === null
		) {
			return state;
		}

		if (action.payload.newLanguageCode === state) {
			return state;
		}

		return action.payload.newLanguageCode;
	})
]);

const pendingLanguageCode = createReducer(undefined as string, handleAction => [
	handleAction(setLanguage.request, (state, action) => {
		if (action.payload.languageCode === null || action.payload.languageCode === undefined) {
			return state;
		}

		if (state !== undefined) {
			return state;
		}

		return action.payload.languageCode;
	}),
	handleAction([setLanguage.success, setLanguage.failed], () => {
		return undefined;
	})
]);

const registeredTranslationProviders = createReducer([] as string[], handleAction => [
	handleAction(registerTranslationProvider, (state, action) => {
		if (
			action.payload.translationProviderId === null ||
			action.payload.translationProviderId === undefined
		) {
			return state;
		}

		if (state.includes(action.payload.translationProviderId)) {
			return state;
		}

		return [...state, action.payload.translationProviderId];
	})
]);

const loadingState = createReducer({} as LoadingState, handleAction => [
	handleAction(registerTranslationProvider, (state, action) => {
		if (
			action.payload.translationProviderId === null ||
			action.payload.translationProviderId === undefined
		) {
			return state;
		}

		const result = { ...state };

		result[action.payload.translationProviderId] = false;

		return result;
	}),
	handleAction(setLanguage.request, state => {
		const result = {};

		for (const prop in state) {
			result[prop] = false;
		}

		return result;
	}),
	handleAction(setLanguage.translationProviderReady, (state, action) => {
		const result = { ...state };

		for (const prop in state) {
			if (prop === action.payload.providerId) {
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
	handleAction(setLanguage.request, (state, action) => {
		if (action.payload.languageCode === null || action.payload.languageCode === undefined) {
			return "shown";
		}

		return "hiding";
	}),
	handleAction(setLanguage.success, (state, action) => {
		if (
			action.payload.newLanguageCode === null ||
			action.payload.newLanguageCode === undefined
		) {
			return state;
		}

		return "shown";
	}),
	handleAction(setLanguage.failed, (state, action) => {
		if (action.payload.languageCode === null || action.payload.languageCode === undefined) {
			return state;
		}

		return "shown";
	}),
	handleAction(setLanguage.pageHasBeenHidden, () => "hidden")
]);

export const translationsReducer = {
	currentLanguageCode,
	pendingLanguageCode,
	registeredTranslationProviders,
	loadingState,
	pageState
};
