import { createReducer } from "deox";
import { combineReducers } from "redux";
import { language } from ".";

const currentLanguageCode = createReducer("en", handle => [
	handle(language.actions.setupLanguageOnServerSide, (_, { payload }) => payload.langCode)
]);

const availableLanguages = createReducer(["pl", "en"], () => []);

export const languageReducers = {
	currentLanguageCode,
	availableLanguages
};

export default combineReducers(languageReducers);
