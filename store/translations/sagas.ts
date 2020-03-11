import { put, takeEvery, select } from "typed-redux-saga";
import { getType } from "deox";
import { isRunningOnServerSelector } from "../environment/selectors";
import { translations } from ".";

export function* changeLanguageIfPageAndTranslationsAreReady() {
	const isServer = yield* select(isRunningOnServerSelector);

	let pageIsAlreadyHidden = true;

	if (!isServer) {
		pageIsAlreadyHidden = yield* select(translations.selectors.isPageHidden);
	}

	const translationsAreReady = yield* select(
		translations.selectors.areAllTranslationProvidersReady
	);

	if (pageIsAlreadyHidden && translationsAreReady) {
		const pendingLanguageCode = yield* select(translations.selectors.pendingLanguageCode);

		if (pendingLanguageCode !== null) {
			yield put(translations.actions.setLanguage.success(pendingLanguageCode));
		} else {
			yield put(
				translations.actions.setLanguage.failed(pendingLanguageCode, {
					from: "redux-saga",
					error: new Error(
						"Attempt to set current language when pendingLanguageCode is null"
					)
				})
			);
		}
	}
}

export default function* watchTranslationActions() {
	yield takeEvery(
		getType(translations.actions.pageHasBeenHidden),
		changeLanguageIfPageAndTranslationsAreReady
	);
	yield takeEvery(
		getType(translations.actions.translationProviderReady),
		changeLanguageIfPageAndTranslationsAreReady
	);
}
