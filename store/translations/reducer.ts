import { createReducer } from "deox";
import { LoadingState, PageState } from "./models";
import { registerTranslationProvider, setLanguage } from "./actions";
import { isNullOrUndefined } from "~/lib/isNullOrUndefined";

const currentLanguageCode = createReducer("en", handleAction => [
	handleAction(setLanguage.success, (state, { payload }) => {
		if (isNullOrUndefined(payload.newLanguageCode)) {
			return state;
		}

		if (payload.newLanguageCode === state) {
			return state;
		}

		return payload.newLanguageCode;
	})
]);

const pendingLanguageCode = createReducer(undefined as string, handleAction => [
	handleAction(setLanguage.request, (state, { payload }) => {
		if (payload.languageCode === null || payload.languageCode === undefined) {
			return state;
		}

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
		if (isNullOrUndefined(payload.translationProviderId)) {
			return state;
		}

		if (state.includes(payload.translationProviderId)) {
			return state;
		}

		return [...state, payload.translationProviderId];
	})
]);

const loadingState = createReducer({} as LoadingState, handleAction => [
	handleAction(registerTranslationProvider, (state, { payload }) => {
		if (isNullOrUndefined(payload.translationProviderId)) {
			return state;
		}

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
	handleAction(setLanguage.request, (state, { payload }) => {
		if (isNullOrUndefined(payload.languageCode)) {
			return "shown";
		}

		return "hiding";
	}),
	handleAction(setLanguage.success, (state, { payload }) => {
		if (isNullOrUndefined(payload.newLanguageCode)) {
			return state;
		}

		return "shown";
	}),
	handleAction(setLanguage.failed, (state, { payload }) => {
		if (isNullOrUndefined(payload.languageCode)) {
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
