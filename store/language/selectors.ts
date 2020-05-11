import { State } from "..";

export const currentLanguage = (state: State) => state.language.currentLanguageCode;

export const availableLanguages = (state: State) => state.language.availableLanguages;
