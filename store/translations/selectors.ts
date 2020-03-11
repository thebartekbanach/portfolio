import { Store } from "..";

export const isPageHiddenSelector = (state: Store) => state.translations.pageState === "hidden";

export const areAllTranslationProvidersReady = (state: Store) => {
	return Object.entries(state.translations.loadingState).every(([_, state]) => state === true);
};

export const pendingLanguageCodeSelector = (state: Store) => state.translations.pendingLanguageCode;
