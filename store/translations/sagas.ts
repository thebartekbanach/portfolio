import { put, takeEvery, select, take, race, call, delay } from "~/lib/sagaEffects";
import { getType } from "deox";
import { translations } from ".";
import { environment } from "../environment";

export function* makeSureAllTranslationProvidersAreReady() {
	let areTranslationProvidersReady = yield* select(
		translations.selectors.areAllTranslationProvidersReady
	);

	while (!areTranslationProvidersReady) {
		const next:
			| ReturnType<typeof translations.actions.translationProviderReady>
			| ReturnType<typeof translations.actions.setLanguage.failed> = yield* take([
			translations.actions.translationProviderReady.type,
			translations.actions.setLanguage.failed.type
		]);

		if (next.type === "translations/setLanguage/failed") {
			return false;
		}

		areTranslationProvidersReady = yield* select(
			translations.selectors.areAllTranslationProvidersReady
		);
	}

	return true;
}

export function* makeSurePageIsHidden() {
	const isServer = yield* select(environment.selectors.isRunningOnServer);

	if (isServer) {
		return true;
	}

	const isPageAlreadyHidden = yield* select(translations.selectors.isPageHidden);

	if (!isPageAlreadyHidden) {
		yield* take(translations.actions.pageHasBeenHidden);
	}

	return true;
}

export function* changeCurrentLanguage() {
	const pendingLanguageCode = yield* select(translations.selectors.pendingLanguageCode);

	if (pendingLanguageCode !== null) {
		yield* put(translations.actions.setLanguage.success(pendingLanguageCode));
	} else {
		yield* put(
			translations.actions.setLanguage.failed(pendingLanguageCode, {
				from: "redux-saga",
				error: new Error("Attempt to set current language when pendingLanguageCode is null")
			})
		);
	}
}

export function* changeLanguageIfPageAndTranslationsAreReady() {
	const { providersLoadedCorrectly, providersLoadTimeout } = yield* race.fn({
		providersLoadedCorrectly: race.call(makeSureAllTranslationProvidersAreReady),
		providersLoadTimeout: delay(translations.constants.translationProvidersLoadTimeoutTime)
	});

	if (providersLoadTimeout) {
		const pendingLanguageCode = yield* select(translations.selectors.pendingLanguageCode);
		return yield* put(
			translations.actions.setLanguage.failed(pendingLanguageCode, {
				from: "redux-saga",
				error: new Error(
					`Providers load timeout ocurred after ${translations.constants.translationProvidersLoadTimeoutTime}ms`
				)
			})
		);
	}

	if (!providersLoadedCorrectly) {
		return;
	}

	const { pageHideTimeout } = yield* race.fn({
		pageIsHidden: race.call(makeSurePageIsHidden),
		pageHideTimeout: delay(translations.constants.pageHideTimeoutTime)
	});

	if (pageHideTimeout) {
		const pendingLanguageCode = yield* select(translations.selectors.pendingLanguageCode);
		return yield* put(
			translations.actions.setLanguage.failed(pendingLanguageCode, {
				from: "redux-saga",
				error: new Error(
					`Page hide timeout ocurred after ${translations.constants.pageHideTimeoutTime}ms`
				)
			})
		);
	}

	yield* call(changeCurrentLanguage);
}

export default function* watchTranslationActions() {
	yield* takeEvery(
		getType(translations.actions.setLanguage.request),
		changeLanguageIfPageAndTranslationsAreReady
	);
}
