import { put, takeEvery, select } from "typed-redux-saga";
import { getType } from "deox";
import { language } from "./actions";
import { isRunningOnServerSelector } from "../environment/selectors";
import {
	isPageHiddenSelector,
	areAllTranslationProvidersReady,
	pendingLanguageCodeSelector
} from "./selectors";

export function* changeLanguageIfPageAndTranslationsAreReady() {
	const isServer = yield* select(isRunningOnServerSelector);

	let pageIsAlreadyHidden = true;

	if (!isServer) {
		pageIsAlreadyHidden = yield* select(isPageHiddenSelector);
	}

	const translationsAreReady = yield* select(areAllTranslationProvidersReady);

	if (pageIsAlreadyHidden && translationsAreReady) {
		const pendingLanguageCode = yield* select(pendingLanguageCodeSelector);

		if (pendingLanguageCode !== undefined) {
			yield put(language.setLanguage.success(pendingLanguageCode));
		} else {
			yield put(
				language.setLanguage.failed(pendingLanguageCode, {
					from: "redux-saga",
					error: new Error(
						"Attempt to set current language when pendingLanguageCode is undefined"
					)
				})
			);
		}
	}
}

export function* watchTranslationActions() {
	yield takeEvery(
		getType(language.pageHasBeenHidden),
		changeLanguageIfPageAndTranslationsAreReady
	);
	yield takeEvery(
		getType(language.translationProviderReady),
		changeLanguageIfPageAndTranslationsAreReady
	);
}
