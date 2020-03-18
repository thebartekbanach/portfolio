import { Store } from "..";

export const isPageHidden = (state: Store) => state.translations.pageState === "hidden";

export const areAllTranslationProvidersReady = (state: Store) => {
	return Object.entries(state.translations.loadingState).every(([_, state]) => state === true);
};

export const pendingLanguageCode = (state: Store) => state.translations.pendingLanguageCode;

export const availableLanguages = (state: Store) => state.translations.availableLanguages;

export const currentLanguageCode = (state: Store) => state.translations.currentLanguageCode;
