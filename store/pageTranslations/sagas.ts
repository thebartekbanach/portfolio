import { takeEvery, put } from "typed-redux-saga";
import { getType } from "deox";
import { translations } from "../translations";
import { pageTranslations } from ".";
import { race } from "~/lib/sagaEffects";
import { pageContentsApi } from "~/lib/api/contentFetchers/page/contents";

export function* loadPageTranslation(
	request: ReturnType<typeof translations.actions.setLanguage.request>
) {
	try {
		const { contents } = yield* race.fn({
			contents: race.call(pageContentsApi.fetchPageContents, request.payload.languageCode),
			providerError: race.take(translations.actions.setLanguage.failed.type)
		});

		if (contents !== undefined) {
			yield* put(
				pageTranslations.actions.pageTranslationsFetched(
					request.payload.languageCode,
					contents
				)
			);

			yield* put(translations.actions.translationProviderReady("page"));
		}
	} catch (fetchError) {
		yield* put(
			translations.actions.setLanguage.failed(request.payload.languageCode, {
				from: "translation-provider",
				translationProviderId: "page",
				error: fetchError
			})
		);
	}
}

export default function* watchPageTranslationsActions() {
	yield* takeEvery(getType(translations.actions.setLanguage.request), loadPageTranslation);
}
