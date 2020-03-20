import { Store } from "..";
import { createSelector } from "reselect";
import { translations } from "../translations";

export const availablePageTranslations = (store: Store) =>
	store.pageTranslations.availablePageTranslations;

export const currentPageTranslation = createSelector(
	availablePageTranslations,
	translations.selectors.currentLanguageCode,
	(availableTranslations, currentLanguageCode) => availableTranslations[currentLanguageCode]
);
